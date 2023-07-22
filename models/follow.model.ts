import mongoose, { Schema, Document } from 'mongoose';

export interface Follow extends Document {
  userId: mongoose.Types.ObjectId;
  followerId: mongoose.Types.ObjectId;
}

const followSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  followerId: { type: mongoose.Types.ObjectId, required: true },
});

export default mongoose.model<Follow>('Follow', followSchema);
