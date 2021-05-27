import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface Irequest {
  name: string;
  description: string;
}
class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  async execute({ name, description }: Irequest): Promise<void> {
    const cateogryAlreadExists = await this.categoriesRepository.findByName(
      name
    );

    if (cateogryAlreadExists) throw new Error('Category Already Exists!');

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
