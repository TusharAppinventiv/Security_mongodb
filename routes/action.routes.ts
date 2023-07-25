// action.route.ts
import express from 'express';
import { addCommentController, addLikeController } from '../controllers/action.controller';

const router = express.Router();

router.post('/comment', addCommentController);
router.post('/like', addLikeController);

export default router;
