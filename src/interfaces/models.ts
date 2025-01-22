export interface IQuestion {
  _id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  answeredQuestions: string[];
}

export interface IMockTest {
  _id: string;
  userId: string;
  questions: string[];
  answers: {
    questionId: string;
    selectedAnswer: number;
  }[];
  score: number;
  completed: boolean;
  createdAt: Date;
}