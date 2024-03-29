import { AppError } from '@shared/errors/appError';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { inject, injectable } from 'tsyringe';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpeficationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists)
      throw new AppError('Specification Already Exists !');

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpeficationUseCase };
