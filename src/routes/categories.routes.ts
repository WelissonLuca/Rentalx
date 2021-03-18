import {  Router } from 'express';
import { v4 as uuidV4 } from 'uuid'
import { CategoriesRepositorie } from '../repositories/CategoriesRepositories'


const categoriesRoutes = Router();

const categoriesRepositorie = new CategoriesRepositorie


categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  categoriesRepositorie.create({ name, description });

  return response.status(201).send();

})

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepositorie.list();

  return response.json(all)
})

export { categoriesRoutes }