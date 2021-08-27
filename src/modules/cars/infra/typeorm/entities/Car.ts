import { v4 as uuid } from 'uuid';

class Car {
  id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  available: boolean;
  brand: string;
  category_id: string;
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
    if (!this.available) this.available = true;
    if (!this.created_at) this.created_at = new Date();
  }
}

export { Car };
