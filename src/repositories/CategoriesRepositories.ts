import { Category } from '../model/category'

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
class CategoriesRepositorie {
  private categories: Category[];

  constructor() {
    this.categories = [];
    
  }

  create({ description, name }: ICreateCategoryDTO): void {
     const category = new Category();
     Object.assign(category, {
       name,
       description,
       created_at: new Date(),
     });

     this.categories.push(category);
  }
};

export { CategoriesRepositorie };