import { AuthenticateUSerController } from '@modules/accounts/useCases/authenticateUser/authenticateUserController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUSerController();

authenticateRoutes.post('/', authenticateUserController.handle);

export { authenticateRoutes };
