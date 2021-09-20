import { AppError } from '@shared/errors/appError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const foundCategory = await this.categoriesRepository.findByName(name);

    if (foundCategory) {
      throw new AppError('Category already exists.');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateCategoryUseCase };
