import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationMovieGenre1684384452518 implements MigrationInterface {
    name = 'UpdateRelationMovieGenre1684384452518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre_movies_movie" ("genreId" integer NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_5b787840ea6352039c37c32e8f0" PRIMARY KEY ("genreId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" ADD CONSTRAINT "FK_dff457c114a6294863814818b0f" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" ADD CONSTRAINT "FK_e59764a417d4f8291747b744faa" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" DROP CONSTRAINT "FK_e59764a417d4f8291747b744faa"`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" DROP CONSTRAINT "FK_dff457c114a6294863814818b0f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e59764a417d4f8291747b744fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dff457c114a6294863814818b0"`);
        await queryRunner.query(`DROP TABLE "genre_movies_movie"`);
    }

}
