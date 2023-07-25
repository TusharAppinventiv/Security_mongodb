import { Types } from 'mongoose';
import FollowModel, { Follow } from '../models/follow.model';
import UserModel, { User } from '../models/users.model';

export const followUser = async (userId: string, followerId: string) => {
  const user = await UserModel.findById(userId);
  const follower = await UserModel.findById(followerId);

  if (!user || !follower) {
    throw new Error('User or follower not found');
  }

  const follow = new FollowModel({
    userId: new Types.ObjectId(userId),
    followerId: new Types.ObjectId(followerId),
  });

  await follow.save();
};

export const unfollowUser = async (userId: string, followerId: string) => {
  await FollowModel.findOneAndDelete({ userId, followerId });
};

export const getFollowers = async (userId: string) => {
  const followers = await FollowModel.find({ userId }).populate('followerId');

  return followers.map((follow) => follow.followerId);
};

export const getFollowing = async (userId: string) => {
  const following = await FollowModel.find({ followerId: userId }).populate('userId');

  return following.map((follow) => follow.userId);
};
