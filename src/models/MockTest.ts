import mongoose, { Schema } from 'mongoose';
import { IMockTest } from '../interfaces/models';

const mockTestSchema = new Schema<IMockTest>({
  userId: { type: String, required: true },
  questions: [{ type: String }],
  answers: [{
    questionId: { type: String },
    selectedAnswer: { type: Number, required: true }
  }],
  score: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const MockTest = mongoose.model<IMockTest>('MockTest', mockTestSchema);


mongoose.connect('mongodb://127.0.0.1:27017/mock-test')
