import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportorBlockTables1761589067218 implements MigrationInterface {
    name = 'AddedReportorBlockTables1761589067218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationCode" character varying(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationCode"`);
    }

}
