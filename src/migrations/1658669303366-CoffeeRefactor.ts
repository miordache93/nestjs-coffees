import { MigrationInterface, QueryRunner } from "typeorm"

export class CoffeeRefactor1658669303366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`
        );
    }

}
