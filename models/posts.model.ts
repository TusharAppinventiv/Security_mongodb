import { Schema, model, Document } from 'mongoose';
import { User } from '../models/users.model';

interface IPostDocument extends Document {
  user: User['_id'];
  caption: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model<IPostDocument>('Post', postSchema);

export default Post;
