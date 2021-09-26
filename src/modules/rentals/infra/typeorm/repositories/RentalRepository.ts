import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });
    await this.repository.save(rental);
    return rental;
  }

  async findByCarId(car_id: string): Promise<Rental> {
    const openedRentalWithCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return openedRentalWithCar;
  }

  async findByUserId(user_id: string): Promise<Rental> {
    const openedRentalWithUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return openedRentalWithUser;
  }
}

export { RentalsRepository };
