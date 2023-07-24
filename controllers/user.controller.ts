import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/user.service';
import { UserInput } from '../types/user.types';
import { redisMiddleware } from '../middlewares/redis.middleware';

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body as UserInput);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUserController = async (req, res) => {
  try {
    await redisMiddleware(req, res, async () => {
      try {
        const token = await loginUser(req.body as UserInput);
    
        res.status(200).json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// export const loginUserController = async (req: Request, res: Response) => {
//   try {
//     const token = await loginUser(req.body as UserInput);

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };