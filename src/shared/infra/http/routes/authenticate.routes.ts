import { AuthenticateUSerController } from '@modules/accounts/useCases/authenticateUser/authenticateUserController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUSerController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);

export { authenticateRoutes };
