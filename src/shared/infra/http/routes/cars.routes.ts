import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';
import { Router } from 'express';

const carsRouters = Router();

const createCarController = new CreateCarController();

carsRouters.post('/', createCarController.handle);

export { carsRouters };
