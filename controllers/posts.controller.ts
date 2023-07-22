// posts.controller.ts
import { Request, Response } from 'express';
import Joi from 'joi';
import postsService from '../services/posts.service';

const postSchemaValidator = Joi.object({
  caption: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

const createPost = async (req: Request, res: Response) => {
  try {
    const { error, value } = postSchemaValidator.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const { caption, imageUrl } = value;
    const userId = req.userId;

    const post = await postsService.createPost(userId, caption, imageUrl);

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  createPost,
};
