import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
