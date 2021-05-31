import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
class AuthenticateUSerUseCase {
  constructor(
    @inject('UserReṕository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error('Email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error('Email or password incorrect');

    const token = sign({}, ' f7166771e7be1c63a6151e0fee45ab0b', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUSerUseCase };
