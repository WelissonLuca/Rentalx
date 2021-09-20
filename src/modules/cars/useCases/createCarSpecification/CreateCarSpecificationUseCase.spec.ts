import { AppError } from '@shared/errors/appError';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('shoul be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'BCA-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'categori',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'name specification',
      description: 'Description specification',
    });

    const specifications_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications).toHaveLength(1);
  });
  it('shoul be able to add a new specification to a non-existents  car', async () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['12', '3', '4', '5'];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
