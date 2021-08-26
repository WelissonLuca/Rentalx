import { AppError } from '@errors/appError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUSerUseCase } from './authenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUSerUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUSerUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456789',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to authenticate witch incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '999',
        email: 'user@user.com',
        password: '1234',
        name: 'User Test Error',
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: '44444',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
