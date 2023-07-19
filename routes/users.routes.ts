import express from 'express';
import { registerUserController, loginUserController } from '../controllers/user.controller';
import { registerUserMiddleware, loginUserMiddleware } from '../middlewares/validation.middleware';

const router = express.Router();

router.post('/register', registerUserMiddleware, registerUserController);
router.post('/login', loginUserMiddleware, loginUserController);

export default router;
