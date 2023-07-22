import express from 'express';
import postsController from '../controllers/posts.controller';
import authMiddleware from '../middlewares/auth.middleware';

const app = express();

app.use(express.json());

app.post('/upload', authMiddleware, postsController.createPost);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
