import { MigrationInterface, QueryRunner } from "typeorm";

export class addReminderList1656282109106 implements MigrationInterface {
    name = 'addReminderList1656282109106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" ADD "reminder" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" DROP COLUMN "reminder"`);
    }

}
