// // action.controller.ts
// import { Request, Response } from 'express';
// import { addComment, addLike } from '../services/action.service';

// export const addCommentController = async (req: Request, res: Response) => {
//   try {
//     const { postId, userId, comment } = req.body;

//     await addComment(postId, userId, comment);

//     res.status(200).json({ message: 'Comment added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const addLikeController = async (req: Request, res: Response) => {
//   try {
//     const { postId, userId } = req.body;

//     await addLike(postId, userId);

//     res.status(200).json({ message: 'Like added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
