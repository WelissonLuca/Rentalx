import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

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
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(
      name
    );
    if (specificationAlreadyExists)
      throw new Error('Specification Already Exists !');
    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpeficationUseCase };
