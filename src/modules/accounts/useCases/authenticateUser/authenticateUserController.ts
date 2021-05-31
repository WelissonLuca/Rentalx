import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUSerUseCase } from './authenticateUserUseCase';

class AuthenticateUSerController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { password, email } = request.body;

      const authenticateUSerUseCase = container.resolve(
        AuthenticateUSerUseCase
      );

      const token = await authenticateUSerUseCase.execute({ password, email });

      return response.json(token);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { AuthenticateUSerController };
