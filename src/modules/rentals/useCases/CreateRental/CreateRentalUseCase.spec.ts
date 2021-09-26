import dayjs from 'dayjs';

import { AppError } from '@shared/errors/appError';

import { RentalRepositoryInMemory } from '@modules/rental/repositories/in-memory/RentalRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let dayJsProvider: DayJsDateProvider;
describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dayJsProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayJsProvider
    );
  });

  it('should be able to create a new rental ', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '1',
      car_id: '1',
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should be able to create a new rental if there is another open to the same user', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1',
        car_id: '1',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '1',
        car_id: '1',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new rental if there is another open to the same car', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1',
        car_id: '1',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '2',
        car_id: '1',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new rental with invalid return time', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1',
        car_id: '1',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
