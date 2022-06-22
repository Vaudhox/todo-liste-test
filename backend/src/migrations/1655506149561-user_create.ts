import { MigrationInterface, QueryRunner } from "typeorm";

export class userCreate1655506149561 implements MigrationInterface {
    name = 'userCreate1655506149561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying(300) NOT NULL, "password" text NOT NULL, "refreshToken" text, "passwordRequestAt" TIMESTAMP WITH TIME ZONE, "tokenPassword" uuid, "imageProfile" text, "emailCheckYourEmailAt" TIMESTAMP WITH TIME ZONE, "tokenCheckYourEmail" uuid, "emailConfirm" boolean NOT NULL DEFAULT false, "firstName" character varying(100), "lastName" character varying(100), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_e752aee509d8f8118c6e5b1d8cc" UNIQUE ("id", "email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
