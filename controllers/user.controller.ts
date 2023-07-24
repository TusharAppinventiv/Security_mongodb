import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sessionModel } from '../models/session.model';
import UserModel from '../models/users.model';
import redisclient from '../redis/redis.client';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name }: { email: string; password: string; name: string } = req.body;
    if (!email || !password || !name) {
      res.status(400).send('Email, password, and name are required');
      return;
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user = new UserModel({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    // Store the registered user in Redis
    await redisclient.set(`user:${user._id}`, JSON.stringify(user));

    res.send(`User ${user.name} created successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    if (!email || !password) {
      res.status(400).send('Email and password are required');
      return;
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).send('Invalid email or password');
      return;
    }

    const validPassword: boolean = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).send('Invalid email or password');
      return;
    }

    const token: string = jwt.sign({ _id: user._id }, 'mysecretkey');

    // Store the login token and status in Redis
    await redisclient.set(`token:${user._id}`, token);
    await redisclient.set(`status:${user._id}`, 'true');

    res.header('Authorization', token).send(`Login successful. Welcome, ${user.name}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
};

