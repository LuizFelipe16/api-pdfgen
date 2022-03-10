import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as generatedId } from 'uuid';

@Entity('products')
class Product {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  constructor() {
    if (!this.id) {
      this.id = generatedId();
    }
  }
}

export { Product };