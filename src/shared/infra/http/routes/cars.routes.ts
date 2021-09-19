import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';
import { ListAvaliableCarsController } from '@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRouters = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();

carsRouters.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouters.get('/available', listAvaliableCarsController.handle);

export { carsRouters };
