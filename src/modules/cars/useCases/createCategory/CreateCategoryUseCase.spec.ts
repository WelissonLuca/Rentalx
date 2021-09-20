import { AppError } from '@shared/errors/appError';

import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let category: Category;
let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be albe to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be albe to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description Test',
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
