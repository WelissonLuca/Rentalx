import { request, response, Router } from 'express';

const categoriesRoutes = Router();

const categories = []

categoriesRoutes.post('/catogeries', (request, response) => {
  const { name, description } = request.body;

  categories.push({
    name,
    description
  });

  return response.status(201);

})


export { categoriesRoutes}