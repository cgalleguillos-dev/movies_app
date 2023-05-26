import { MigrationInterface, QueryRunner } from "typeorm";

export class NullablePosterPathMovie1684904604066 implements MigrationInterface {
    name = 'NullablePosterPathMovie1684904604066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "poster_path" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "poster_path" SET NOT NULL`);
    }

}
