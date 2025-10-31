import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportorBlockTables1761680945659 implements MigrationInterface {
    name = 'AddedReportorBlockTables1761680945659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "fullAddress" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "suburb" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "unit" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "houseNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "streetName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "streetName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "houseNumber"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "suburb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullAddress"`);
    }

}
