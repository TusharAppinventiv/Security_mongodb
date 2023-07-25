// import { Request, Response } from 'express';
// import { followUser, unfollowUser, getFollowers, getFollowing } from '../services/follow.service';

// export const followUserController = async (req: Request, res: Response) => {
//   try {
//     const { userId, followerId } = req.body;

//     await followUser(userId, followerId);

//     res.status(200).json({ message: 'User followed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const unfollowUserController = async (req: Request, res: Response) => {
//   try {
//     const { userId, followerId } = req.body;

//     await unfollowUser(userId, followerId);

//     res.status(200).json({ message: 'User unfollowed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getFollowersController = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     const followers = await getFollowers(userId);

//     res.status(200).json(followers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getFollowingController = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     const following = await getFollowing(userId);

//     res.status(200).json(following);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
