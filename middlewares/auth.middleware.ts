import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'mysecretkey';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
