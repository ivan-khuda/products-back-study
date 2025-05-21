import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeProductsTagToNullable1747847411079
  implements MigrationInterface
{
  name = 'ChangeProductsTagToNullable1747847411079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "tags" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "tags" SET NOT NULL`,
    );
  }
}
