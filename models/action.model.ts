// action.model.ts
import { Schema, model } from 'mongoose';

const actionSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  actionType: {
    type: String,
    enum: ['like', 'comment'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
  },
});

const Action = model('Action', actionSchema);

export default Action;
