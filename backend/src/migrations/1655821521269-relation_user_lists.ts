import { MigrationInterface, QueryRunner } from "typeorm";

export class relationUserLists1655821521269 implements MigrationInterface {
    name = 'relationUserLists1655821521269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_f31d86dcee536c7c03da60487a6" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_f31d86dcee536c7c03da60487a6"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP COLUMN "ownerId"`);
    }

}
