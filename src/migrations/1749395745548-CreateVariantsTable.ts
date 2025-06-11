import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVariantsTable1749395745548 implements MigrationInterface {
    name = 'CreateVariantsTable1749395745548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."variants_weightunit_enum" AS ENUM('kg', 'lb', 'oz')`);
        await queryRunner.query(`CREATE TABLE "variants" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "price" double precision NOT NULL DEFAULT '0', "sku" character varying NOT NULL, "barcode" character varying NOT NULL, "weight" integer NOT NULL, "weightUnit" "public"."variants_weightunit_enum" NOT NULL DEFAULT 'kg', "inventory" integer NOT NULL, "imageId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_672d13d1a6de0197f20c6babb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_bdbfe33a28befefa9723c355036" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_bdbfe33a28befefa9723c355036"`);
        await queryRunner.query(`DROP TABLE "variants"`);
        await queryRunner.query(`DROP TYPE "public"."variants_weightunit_enum"`);
    }

}
