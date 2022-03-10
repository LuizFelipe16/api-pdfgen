import express from 'express';
import { Request, Response } from 'express';

import { CreateProductController } from '../controllers/Product/CreateProductController';
import { ListProductsController } from '../controllers/Product/ListProductsController';

import PDFPrinter from 'pdfmake';
import fileSystem from 'fs';
import { TDocumentDefinitions, TableCell } from 'pdfmake/interfaces';
import { fonts } from '../configs/pdf';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../repositories/ProductsRepository';

const routes = express.Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();

routes.post('/products', createProductController.handle);
routes.get('/products', listProductsController.handle);

// PDF
routes.get('/products/report', async (request: Request, response: Response) => {
  const productsRepository = getCustomRepository(ProductsRepository);

  const products = await productsRepository.find();

  const printer = new PDFPrinter(fonts);
  // Pode ir em custom FONT na Documentação

  const body = [];
  const columnsTitle: TableCell[] = [
    { text: "ID", style: "id" },
    { text: "Descrição", style: "columnsTitle" },
    { text: "Preço", style: "columnsTitle" },
    { text: "Quantidade", style: "columnsTitle" },
  ];

  const columnsBody = new Array();

  columnsTitle.forEach(column => columnsBody.push(column));
  body.push(columnsBody);

  // Criar um array de produto pois no content deve ser assim
  for await (let product of products) {
    const rows = new Array();
    rows.push(product.id);
    rows.push(product.description);
    rows.push(`R$ ${product.price}`);
    rows.push(product.quantity);

    body.push(rows);
  }

  const documentDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Helvetica" },
    content: [
      {
        columns: [
          { text: "Relatório de Produtos", style: "header" },
          { text: "01/01/01 - 11:00 AM\n\n", style: "header" }
        ]
      },
      {
        table: {
          heights: function (row) {
            return (row + 1) * 25;
          },
          widths: [260, "auto", "auto", "auto"],
          body: body
        }
      }
    ],
    styles: {
      header: {
        fontSize: 10,
        bold: true,
        alignment: "center"
      },
      columnsTitle: {
        fontSize: 13,
        bold: true,
        fillColor: "#333",
        color: "#fff",
        alignment: "center",
        margin: 5
      },
      id: {
        fillColor: "#999",
        color: "#fff",
        alignment: "center",
        margin: 4
      },
      footer: {
        alignment: "center"
      }
    }
  }

  const pdfDocument = printer.createPdfKitDocument(documentDefinitions);

  pdfDocument.pipe(fileSystem.createWriteStream("Relatório.pdf"));
  // Pipe = Pega o conteúdo do arquivo e passa para um outro local
  // files ta criando um arquivo fisico

  const chunks = [];

  pdfDocument.on("data", (chunk) => {
    chunks.push(chunk);
    // Pega o conteúdo que tá sendo gerado no relatório
  });

  pdfDocument.end();

  pdfDocument.on("end", () => {
    const result = Buffer.concat(chunks)
    response.end(result);
    // Passa as informações no browser
  });

  // return response.status(200).send("Relatório feito.");
});

export { routes };