import express from 'express';
import { login, signup } from '../controllers/user.controller';
import { sessionCheck } from '../middlewares/redis.middleware.';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/protected', sessionCheck, (req, res) => {
  res.send('You are authorized to access this resource');
});

export default router;
