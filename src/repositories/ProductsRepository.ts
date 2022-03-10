import { EntityRepository, Repository } from "typeorm";
import { Product } from "../models/Product";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> { }