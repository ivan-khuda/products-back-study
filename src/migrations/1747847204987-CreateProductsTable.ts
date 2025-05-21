import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1747847204987 implements MigrationInterface {
  name = 'CreateProductsTable1747847204987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."products_status_enum" AS ENUM(
        'draft',
        'published',
        'archived'
    )`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" (
        "id" SERIAL NOT NULL,
        "title" character varying(255) NOT NULL,
        "body" character varying NOT NULL,
        "status" "public"."products_status_enum" NOT NULL DEFAULT 'draft',
        "tags" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
  }
}
