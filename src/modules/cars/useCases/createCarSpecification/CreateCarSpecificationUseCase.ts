import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/appError';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) throw new AppError('Car does not exist', 404);

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
