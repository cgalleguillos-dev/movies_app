import { MigrationInterface, QueryRunner } from "typeorm";

export class EditIdActorToNumber1684341854222 implements MigrationInterface {
    name = 'EditIdActorToNumber1684341854222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_65be8ded67af2677acfd19854c2"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "PK_05b325494fcc996a44ae6928e5e"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_992f9af300d8c96c46fea4e5419" PRIMARY KEY ("movieId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65be8ded67af2677acfd19854c"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP COLUMN "actorId"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD "actorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_992f9af300d8c96c46fea4e5419"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9" PRIMARY KEY ("movieId", "actorId")`);
        await queryRunner.query(`CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId") `);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_65be8ded67af2677acfd19854c2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65be8ded67af2677acfd19854c"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_992f9af300d8c96c46fea4e5419" PRIMARY KEY ("movieId")`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP COLUMN "actorId"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD "actorId" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId") `);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "PK_992f9af300d8c96c46fea4e5419"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9" PRIMARY KEY ("movieId", "actorId")`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "PK_05b325494fcc996a44ae6928e5e"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
