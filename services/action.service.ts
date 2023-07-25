// action.service.ts
import { Types } from 'mongoose';
import Action from '../models/action.model';

export const addComment = async (postId: string, userId: string, comment: string) => {
  const action = new Action({
    post: new Types.ObjectId(postId),
    user: new Types.ObjectId(userId),
    actionType: 'comment',
    comment,
  });

  await action.save();
};

export const addLike = async (postId: string, userId: string) => {
  const action = new Action({
    post: new Types.ObjectId(postId),
    user: new Types.ObjectId(userId),
    actionType: 'like',
  });

  await action.save();
};

export const getLikes = async (postId: string) => {
  const count = await Action.countDocuments({ post: new Types.ObjectId(postId), actionType: 'like' });

  return count;
};

export const getComments = async (postId: string) => {
  const count = await Action.countDocuments({ post: new Types.ObjectId(postId), actionType: 'comment' });

  return count;
};

