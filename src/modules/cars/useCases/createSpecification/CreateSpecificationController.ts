import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpeficationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createSpecificationUseCase = container.resolve(
      CreateSpeficationUseCase
    );

    const specification = await createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  }
}

export { CreateSpecificationController };
