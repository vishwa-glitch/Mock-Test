import { Question } from '../models/Question';
import { User } from '../models/User';
import { MockTest } from '../models/MockTest';
import mongoose from 'mongoose';
import { IMockTest } from '../interfaces/models';

export class MockTestService {
  // Generate a new mock test for a user
  async createMockTest(userId: string, questionCount: number = 10): Promise<IMockTest> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Get questions that user hasn't answered yet
    const questions = await Question.aggregate([
      { $match: { _id: { $nin: user.answeredQuestions.map(id => new mongoose.Types.ObjectId(id)) } } },
      { $sample: { size: questionCount } }
    ]);

    if (questions.length < questionCount) {
      throw new Error('Not enough unique questions available');
    }

    const mockTest = await MockTest.create({
      userId: new mongoose.Types.ObjectId(userId),
      questions: questions.map(q => q._id),
      answers: [],
      completed: false
    });

    return mockTest;
  }

  // Submit answers for a mock test
  async submitTest(testId: string, answers: { questionId: string, selectedAnswer: number }[]): Promise<IMockTest> {
    const mockTest = await MockTest.findById(testId);
    if (!mockTest) {
      throw new Error('Test not found');
    }

    if (mockTest.completed) {
      throw new Error('Test already completed');
    }

    // Calculate score
    let score = 0;
    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question && question.correctAnswer === answer.selectedAnswer) {
        score++;
      }
    }

    // Update user's answered questions
    await User.findByIdAndUpdate(mockTest.userId, {
      $addToSet: { answeredQuestions: { $each: mockTest.questions } }
    });

    // Update mock test
    mockTest.answers = answers;
    mockTest.score = score;
    mockTest.completed = true;
    await mockTest.save();

    return mockTest;
  }
} 