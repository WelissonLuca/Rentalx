import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { ListAvaliableCarsUseCase } from './ListAvaliableCarsUseCase';

let listAvaliableCarsUseCase: ListAvaliableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('ListCars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvaliableCarsUseCase = new ListAvaliableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fusca',
      description: 'Carro popular do Brasil',
      daily_rate: 50,
      license_plate: 'ABC1234',
      fine_amount: 40,
      brand: 'VW',
      category_id: '1',
    });
    const cars = await listAvaliableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fusca',
      description: 'Carro popular do Brasil',
      daily_rate: 50,
      license_plate: 'ABC1234',
      fine_amount: 40,
      brand: 'VWW',
      category_id: '1',
    });
    const cars = await listAvaliableCarsUseCase.execute({ brand: 'VWW' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fuscão',
      description: 'Carro popular do Brasil',
      daily_rate: 50,
      license_plate: 'ABC1234',
      fine_amount: 40,
      brand: 'VWW',
      category_id: '1',
    });
    const cars = await listAvaliableCarsUseCase.execute({ name: 'Fuscão' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fuscão',
      description: 'Carro popular do Brasil',
      daily_rate: 50,
      license_plate: 'ABC1234',
      fine_amount: 40,
      brand: 'VWW',
      category_id: '1',
    });
    const cars = await listAvaliableCarsUseCase.execute({ category_id: '1' });

    expect(cars).toEqual([car]);
  });
});
