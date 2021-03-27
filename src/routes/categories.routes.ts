import { Router } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';



const categoriesRoutes = Router();

const categoriesRepositorie = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepositorie.list();

  return response.json(all);
});

export { categoriesRoutes };
