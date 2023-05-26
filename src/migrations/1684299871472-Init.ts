import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1684299871472 implements MigrationInterface {
    name = 'Init1684299871472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actor" ("id" character varying NOT NULL, "adult" boolean NOT NULL, "gender" integer NOT NULL, "known_for_department" character varying NOT NULL, "name" character varying NOT NULL, "original_name" character varying NOT NULL, "popularity" double precision NOT NULL, "profile_path" character varying, "cast_id" integer NOT NULL, "character" character varying NOT NULL, "credit_id" character varying NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" integer NOT NULL, "adult" boolean NOT NULL, "backdrop_path" character varying NOT NULL, "original_language" character varying NOT NULL, "original_title" character varying NOT NULL, "overview" character varying NOT NULL, "popularity" double precision NOT NULL, "poster_path" character varying NOT NULL, "release_date" character varying NOT NULL, "title" character varying NOT NULL, "video" boolean NOT NULL, "vote_average" double precision NOT NULL, "vote_count" integer NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_actors_actor" ("movieId" integer NOT NULL, "actorId" character varying NOT NULL, CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9" PRIMARY KEY ("movieId", "actorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId") `);
        await queryRunner.query(`CREATE TABLE "playlist_movies_movie" ("playlistId" uuid NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_76b9c84e158dcfa7567f3b73915" PRIMARY KEY ("playlistId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5aeeadcb93252f2fbd65053cbb" ON "playlist_movies_movie" ("playlistId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c1a6f297e49edb100c13c2ae1b" ON "playlist_movies_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_992f9af300d8c96c46fea4e5419" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_movies_movie" ADD CONSTRAINT "FK_5aeeadcb93252f2fbd65053cbbe" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_movies_movie" ADD CONSTRAINT "FK_c1a6f297e49edb100c13c2ae1b4" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_movies_movie" DROP CONSTRAINT "FK_c1a6f297e49edb100c13c2ae1b4"`);
        await queryRunner.query(`ALTER TABLE "playlist_movies_movie" DROP CONSTRAINT "FK_5aeeadcb93252f2fbd65053cbbe"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_65be8ded67af2677acfd19854c2"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_992f9af300d8c96c46fea4e5419"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1a6f297e49edb100c13c2ae1b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5aeeadcb93252f2fbd65053cbb"`);
        await queryRunner.query(`DROP TABLE "playlist_movies_movie"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65be8ded67af2677acfd19854c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_992f9af300d8c96c46fea4e541"`);
        await queryRunner.query(`DROP TABLE "movie_actors_actor"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "actor"`);
    }

}
