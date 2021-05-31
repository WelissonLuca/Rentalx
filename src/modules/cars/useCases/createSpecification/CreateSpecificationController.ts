import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpeficationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;
      const createSpecificationUseCase = container.resolve(
        CreateSpeficationUseCase
      );

      await createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateSpecificationController };
