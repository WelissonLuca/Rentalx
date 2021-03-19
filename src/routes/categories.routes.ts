import {  Router } from 'express';
import { v4 as uuidV4 } from 'uuid'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService'

const categoriesRoutes = Router();

const categoriesRepositorie = new CategoriesRepository


categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepositorie);

  createCategoryService.execute({name, description})

  return response.status(201).send();

})

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepositorie.list();

  return response.json(all)
})

export { categoriesRoutes }