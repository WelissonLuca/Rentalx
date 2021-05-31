import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new Error('Token missing');

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'f7166771e7be1c63a6151e0fee45ab0b'
    ) as IPayload;
    const usersRepository = new UserRepository();
    const user = usersRepository.findById(user_id);

    if (!user) throw new Error('User does not exists');
    next();
  } catch (error) {
    throw new Error('Invalid token!');
  }
}
