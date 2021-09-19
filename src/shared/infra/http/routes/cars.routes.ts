import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRouters = Router();

const createCarController = new CreateCarController();

carsRouters.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carsRouters };
