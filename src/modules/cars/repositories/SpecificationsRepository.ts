import { Specification } from '../model/Specification';
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from './ISpecificationRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private Specifications: Specification[];

  constructor() {
    this.Specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_At: new Date(),
    });

    this.Specifications.push(specification);
  }
  findByName(name: string): Specification {
    const specification = this.Specifications.find(specification => specification.name === name)

    return specification
  }
}

export { SpecificationsRepository }