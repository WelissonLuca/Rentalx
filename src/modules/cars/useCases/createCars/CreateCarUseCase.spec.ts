import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { AppError } from '@shared/errors/appError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'name car',
      description: 'Description car',
      daily_rate: 100,
      available: true,
      license_plate: 'BCA-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'categori',
    });
  });

  it('should not be able to create a car with exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'name car',
        description: 'Description car',
        daily_rate: 100,
        available: true,
        license_plate: 'BCA-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'categori',
      });

      await createCarUseCase.execute({
        name: 'name car',
        description: 'Description car',
        daily_rate: 100,
        available: true,
        license_plate: 'BCA-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'categori',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
