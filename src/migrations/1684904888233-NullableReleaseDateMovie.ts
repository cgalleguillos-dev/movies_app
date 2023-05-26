import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableReleaseDateMovie1684904888233 implements MigrationInterface {
    name = 'NullableReleaseDateMovie1684904888233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "release_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "release_date" SET NOT NULL`);
    }

}
