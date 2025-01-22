import mongoose, { Schema } from 'mongoose';
import { IQuestion } from '../interfaces/models';

const questionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  subject: { type: String, required: true },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['easy', 'medium', 'hard']
  }
});

export const Question = mongoose.model<IQuestion>('Question', questionSchema); 