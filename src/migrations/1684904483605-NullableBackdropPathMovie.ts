import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableBackdropPathMovie1684904483605 implements MigrationInterface {
    name = 'NullableBackdropPathMovie1684904483605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "backdrop_path" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "backdrop_path" SET NOT NULL`);
    }

}
