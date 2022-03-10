import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../../repositories/ProductsRepository';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const {
      description,
      price,
      quantity
    } = request.body;

    const productsRepository = getCustomRepository(ProductsRepository);

    const product = productsRepository.create({
      description,
      price,
      quantity
    });

    await productsRepository.save(product);

    return response.status(201).json({
      product
    });
  }
}