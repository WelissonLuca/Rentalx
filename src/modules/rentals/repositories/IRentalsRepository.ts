import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findByCarId(car_id: string): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
