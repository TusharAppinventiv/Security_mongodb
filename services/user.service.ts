import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { User as UserType } from '../models/users.model';
import { UserInput } from '../types/user.types';

const saltRounds = 10;
const secretKey = 'mysecretkey';

export const registerUser = async (userData: UserInput): Promise<UserType> => {
  try {
    const { name, email, password } = userData;

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

export const loginUser = async (userData: UserInput): Promise<string> => {
  try {
    const { email, password } = userData;

    // Find user in database
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey,{expiresIn:'10h'});

    return token;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};
