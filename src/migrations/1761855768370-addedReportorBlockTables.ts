import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportorBlockTables1761855768370 implements MigrationInterface {
    name = 'AddedReportorBlockTables1761855768370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tax_info" ("id" SERIAL NOT NULL, "taxFileNumber" character varying, "australianBusinessNumber" character varying, "taxResidencyStatus" character varying, CONSTRAINT "PK_1c8a42cfdb401a4a93b32129c35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social_links" ("id" SERIAL NOT NULL, "linkedinProfile" character varying, "facebookProfile" character varying, "twitterProfile" character varying, "instagramProfile" character varying, "githubProfile" character varying, CONSTRAINT "PK_50d32c67ddd71c09d372b02167f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "basic_details" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying, "contactNumber" character varying, "dateOfBirth" date, "homeAddress" character varying, "bio" text, CONSTRAINT "PK_15268a0477a36603ae8352c3fb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "taxFileNumber"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "australianBusinessNumber"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "taxResidencyStatus"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "linkedinProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "facebookProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "twitterProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "instagramProfile"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP COLUMN "githubProfile"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "jobTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "industry" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "jobDescription" text`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "payRateMin" numeric`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "payRateMax" numeric`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "fromDate" date`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "toDate" date`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "preferredIndustry" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "preferredJobTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "expectedPayMin" numeric`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "expectedPayMax" numeric`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "daysAvailable" text`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "startTime" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "endTime" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "manualOffers" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "quickOffers" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "receiveWithinKm" numeric`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "qualificationType" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "institution" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "yearCompleted" numeric`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "grade" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "certificationName" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "issuingOrganization" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "issueDate" date`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "expiryDate" date`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "skills" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD "skills" character varying`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "expiryDate"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "issueDate"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "issuingOrganization"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "certificationName"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "grade"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "yearCompleted"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "institution"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "qualificationType"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "receiveWithinKm"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "quickOffers"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "manualOffers"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "daysAvailable"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "expectedPayMax"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "expectedPayMin"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "preferredJobTitle"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "preferredIndustry"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "toDate"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "fromDate"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "payRateMax"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "payRateMin"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "jobDescription"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "industry"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP COLUMN "jobTitle"`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "githubProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "instagramProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "twitterProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "facebookProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "linkedinProfile" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "taxResidencyStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "australianBusinessNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD "taxFileNumber" character varying`);
        await queryRunner.query(`DROP TABLE "basic_details"`);
        await queryRunner.query(`DROP TABLE "social_links"`);
        await queryRunner.query(`DROP TABLE "tax_info"`);
    }

}
