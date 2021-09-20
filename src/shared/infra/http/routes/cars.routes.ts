import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';
import { ListAvaliableCarsController } from '@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRouters = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

const uploadCarImage = multer(uploadConfig.upload('./tmp/cars'));

carsRouters.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouters.get('/available', listAvaliableCarsController.handle);

carsRouters.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRouters.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImagesController.handle
);

export { carsRouters };
