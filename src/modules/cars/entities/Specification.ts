import { v4 as uuidV4 } from 'uuid';
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('specifications')
class Specification {
  @PrimaryColumn()
  id?: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @CreateDateColumn()
  created_At: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Specification };
