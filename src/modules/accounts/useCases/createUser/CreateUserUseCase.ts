import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { AppError } from '@shared/errors/appError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }
    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });

    return user;
  }
}
export { CreateUserUseCase };
