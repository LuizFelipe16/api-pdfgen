import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1628292176183 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'price',
            type: 'number'
          },
          {
            name: 'quantity',
            type: 'number'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('products');
  }

}
