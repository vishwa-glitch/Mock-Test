import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/models';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  answeredQuestions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export const User = mongoose.model<IUser>('User', userSchema);