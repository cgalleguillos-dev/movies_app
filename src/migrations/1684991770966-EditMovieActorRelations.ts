import { MigrationInterface, QueryRunner } from "typeorm";

export class EditMovieActorRelations1684991770966 implements MigrationInterface {
    name = 'EditMovieActorRelations1684991770966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_8cc9dd1b97d08d737a6fe06e810"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_75c8cc9e58f4ccf5d3c233caef7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8cc9dd1b97d08d737a6fe06e81"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_75c8cc9e58f4ccf5d3c233caef"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_d23f2d33510b096ed0b56ee18da"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_75c8cc9e58f4ccf5d3c233caef7" PRIMARY KEY ("actor")`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP COLUMN "movie"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_75c8cc9e58f4ccf5d3c233caef7"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP COLUMN "actor"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD "movieId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_992f9af300d8c96c46fea4e5419" PRIMARY KEY ("movieId")`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD "actorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_992f9af300d8c96c46fea4e5419"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9" PRIMARY KEY ("movieId", "actorId")`);
        await queryRunner.query(`CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId") `);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_992f9af300d8c96c46fea4e5419" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_65be8ded67af2677acfd19854c2"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_992f9af300d8c96c46fea4e5419"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65be8ded67af2677acfd19854c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_992f9af300d8c96c46fea4e541"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_992f9af300d8c96c46fea4e5419" PRIMARY KEY ("movieId")`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP COLUMN "actorId"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_992f9af300d8c96c46fea4e5419"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD "actor" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_75c8cc9e58f4ccf5d3c233caef7" PRIMARY KEY ("actor")`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD "movie" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_75c8cc9e58f4ccf5d3c233caef7"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_d23f2d33510b096ed0b56ee18da" PRIMARY KEY ("movie", "actor")`);
        await queryRunner.query(`CREATE INDEX "IDX_75c8cc9e58f4ccf5d3c233caef" ON "movie_actors_actor" ("actor") `);
        await queryRunner.query(`CREATE INDEX "IDX_8cc9dd1b97d08d737a6fe06e81" ON "movie_actors_actor" ("movie") `);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_75c8cc9e58f4ccf5d3c233caef7" FOREIGN KEY ("actor") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_8cc9dd1b97d08d737a6fe06e810" FOREIGN KEY ("movie") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
