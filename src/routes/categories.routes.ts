import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/listCategoriesController';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
