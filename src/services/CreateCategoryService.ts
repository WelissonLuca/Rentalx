import { CategoriesRepository } from "../repositories/CategoriesRepositories";


interface Irequest{
  name: string;
  description: string;
}
class CreateCategoryService {
  constructor(private categoriesRepositorie: CategoriesRepository) {}
  execute({ name, description }: Irequest): void {
    const cateogryAlreadExists = this.categoriesRepositorie.findByname(name);

    if (cateogryAlreadExists) throw new Error('Category Already Exists!');

    this.categoriesRepositorie.create({ name, description });
  }
}

export { CreateCategoryService }