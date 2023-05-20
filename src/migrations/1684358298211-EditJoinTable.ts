import { MigrationInterface, QueryRunner } from "typeorm";

export class EditJoinTable1684358298211 implements MigrationInterface {
    name = 'EditJoinTable1684358298211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actor_movies_movie" ("actorId" integer NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_bb8e9dcbccde7d3edd9383fb25a" PRIMARY KEY ("actorId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId") `);
        await queryRunner.query(`CREATE TABLE "movie_playlists_playlist" ("movieId" integer NOT NULL, "playlistId" uuid NOT NULL, CONSTRAINT "PK_6ad8f26fdc10b9360e8abb749e6" PRIMARY KEY ("movieId", "playlistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_adb7c4fb54d2294eac515b469e" ON "movie_playlists_playlist" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa084c049eddef30c045237414" ON "movie_playlists_playlist" ("playlistId") `);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" ADD CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" ADD CONSTRAINT "FK_45708bd514560bac8a3a54470d5" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_playlists_playlist" ADD CONSTRAINT "FK_adb7c4fb54d2294eac515b469ea" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_playlists_playlist" ADD CONSTRAINT "FK_aa084c049eddef30c045237414f" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_playlists_playlist" DROP CONSTRAINT "FK_aa084c049eddef30c045237414f"`);
        await queryRunner.query(`ALTER TABLE "movie_playlists_playlist" DROP CONSTRAINT "FK_adb7c4fb54d2294eac515b469ea"`);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" DROP CONSTRAINT "FK_45708bd514560bac8a3a54470d5"`);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" DROP CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa084c049eddef30c045237414"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adb7c4fb54d2294eac515b469e"`);
        await queryRunner.query(`DROP TABLE "movie_playlists_playlist"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45708bd514560bac8a3a54470d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48fa78b2634b01bf58ad1686ef"`);
        await queryRunner.query(`DROP TABLE "actor_movies_movie"`);
    }

}
