import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/ISpecificationRepository';
import { Repository, getRepository } from 'typeorm';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await this.repository.findByIds(ids);

    return specification;
  }
}

export { SpecificationsRepository };
