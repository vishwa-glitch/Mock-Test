import { Request, Response } from 'express';
import { MockTestService } from '../services/mockTestService';

const mockTestService = new MockTestService();

export class MockTestController {
  async createTest(req: Request, res: Response) {
    try {
      const { userId, questionCount } = req.body;
      const mockTest = await mockTestService.createMockTest(userId, questionCount);
      res.json(mockTest);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async submitTest(req: Request, res: Response) {
    try {
      const { testId, answers } = req.body;
      const result = await mockTestService.submitTest(testId, answers);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 