// posts.service.ts
import Post from '../models/posts.model';

const createPost = async (userId: string, caption: string, imageUrl: string) => {
  const post = new Post({
    user: userId,
    caption,
    imageUrl,
  });

  const savedPost = await post.save();

  return savedPost;
};

export default {
  createPost,
};
