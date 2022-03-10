import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../../repositories/ProductsRepository';

export class ListProductsController {
  async handle(request: Request, response: Response) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.find();

    return response.status(201).json(products);
  }
}