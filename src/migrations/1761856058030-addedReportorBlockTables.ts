import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportorBlockTables1761856058030 implements MigrationInterface {
    name = 'AddedReportorBlockTables1761856058030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "basicDetailsId" integer`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD CONSTRAINT "UQ_04b4a3ac60f164f094a07c0cef3" UNIQUE ("basicDetailsId")`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "taxInfoId" integer`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD CONSTRAINT "UQ_e5cf2f7687d4afa236269b87d1e" UNIQUE ("taxInfoId")`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "socialLinksId" integer`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD CONSTRAINT "UQ_53aea315f8afb0e55b0b6b350be" UNIQUE ("socialLinksId")`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD CONSTRAINT "FK_04b4a3ac60f164f094a07c0cef3" FOREIGN KEY ("basicDetailsId") REFERENCES "basic_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD CONSTRAINT "FK_e5cf2f7687d4afa236269b87d1e" FOREIGN KEY ("taxInfoId") REFERENCES "tax_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD CONSTRAINT "FK_53aea315f8afb0e55b0b6b350be" FOREIGN KEY ("socialLinksId") REFERENCES "social_links"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP CONSTRAINT "FK_53aea315f8afb0e55b0b6b350be"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP CONSTRAINT "FK_e5cf2f7687d4afa236269b87d1e"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP CONSTRAINT "FK_04b4a3ac60f164f094a07c0cef3"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP CONSTRAINT "UQ_53aea315f8afb0e55b0b6b350be"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "socialLinksId"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP CONSTRAINT "UQ_e5cf2f7687d4afa236269b87d1e"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "taxInfoId"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP CONSTRAINT "UQ_04b4a3ac60f164f094a07c0cef3"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "basicDetailsId"`);
    }

}
