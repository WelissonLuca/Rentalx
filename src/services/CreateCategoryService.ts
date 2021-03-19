import { ICategoriesRepository } from "../repositories/ICategoriesRepository";


interface Irequest{
  name: string;
  description: string;
}
class CreateCategoryService {
  constructor(private categoriesRepositorie: ICategoriesRepository) {}
  execute({ name, description }: Irequest): void {
    const cateogryAlreadExists = this.categoriesRepositorie.findByName(name);

    if (cateogryAlreadExists) throw new Error('Category Already Exists!');

    this.categoriesRepositorie.create({ name, description });
  }
}

export { CreateCategoryService }