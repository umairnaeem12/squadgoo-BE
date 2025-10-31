import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportorBlockTables1761856463491 implements MigrationInterface {
    name = 'AddedReportorBlockTables1761856463491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "basicDetailsId" integer`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD CONSTRAINT "UQ_b7719c73d2916c12a49f23e53bc" UNIQUE ("basicDetailsId")`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "taxInfoId" integer`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD CONSTRAINT "UQ_cb5c41aa45570cfec1991eccab5" UNIQUE ("taxInfoId")`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "socialLinksId" integer`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD CONSTRAINT "UQ_16a96ccb0fd0172b4ab275a68fd" UNIQUE ("socialLinksId")`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD CONSTRAINT "FK_b7719c73d2916c12a49f23e53bc" FOREIGN KEY ("basicDetailsId") REFERENCES "basic_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD CONSTRAINT "FK_cb5c41aa45570cfec1991eccab5" FOREIGN KEY ("taxInfoId") REFERENCES "tax_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD CONSTRAINT "FK_16a96ccb0fd0172b4ab275a68fd" FOREIGN KEY ("socialLinksId") REFERENCES "social_links"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recruiters" DROP CONSTRAINT "FK_16a96ccb0fd0172b4ab275a68fd"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP CONSTRAINT "FK_cb5c41aa45570cfec1991eccab5"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP CONSTRAINT "FK_b7719c73d2916c12a49f23e53bc"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP CONSTRAINT "UQ_16a96ccb0fd0172b4ab275a68fd"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "socialLinksId"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP CONSTRAINT "UQ_cb5c41aa45570cfec1991eccab5"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "taxInfoId"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP CONSTRAINT "UQ_b7719c73d2916c12a49f23e53bc"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "basicDetailsId"`);
    }

}
