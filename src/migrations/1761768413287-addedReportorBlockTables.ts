import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportorBlockTables1761768413287 implements MigrationInterface {
    name = 'AddedReportorBlockTables1761768413287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "companyWebsite"`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "businessName" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "businessAddress" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "directorName" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "directorContactNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "directorContactEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "taxFileNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "australianBusinessNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "taxResidencyStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "linkedinProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "facebookProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "twitterProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "instagramProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "githubProfile" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "githubProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "instagramProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "twitterProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "facebookProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "linkedinProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "taxResidencyStatus"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "australianBusinessNumber"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "taxFileNumber"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "directorContactEmail"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "directorContactNumber"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "directorName"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "businessAddress"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "businessName"`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "companyWebsite" character varying`);
    }

}
