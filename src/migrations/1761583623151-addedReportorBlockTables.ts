import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportorBlockTables1761583623151 implements MigrationInterface {
    name = 'AddedReportorBlockTables1761583623151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recruiters" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "companyWebsite" character varying, "userId" integer, CONSTRAINT "REL_13de46128ebcd3acb192f6b4dd" UNIQUE ("userId"), CONSTRAINT "PK_1999e5a8e68fa6c525eed22c970" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_seekers" ("id" SERIAL NOT NULL, "resumeUrl" character varying, "skills" character varying, "userId" integer, CONSTRAINT "REL_ea25e977504f0b51eb5875b105" UNIQUE ("userId"), CONSTRAINT "PK_55226d152f96d335fdeae57b6d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "individuals" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_d9dc0835c8509652f956f91fb2" UNIQUE ("userId"), CONSTRAINT "PK_ebf809180acc8fce381144eb48b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('jobseeker', 'recruiter', 'individual')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "referralCode" character varying, "isEmailVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recruiters" ADD CONSTRAINT "FK_13de46128ebcd3acb192f6b4dd9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_seekers" ADD CONSTRAINT "FK_ea25e977504f0b51eb5875b1055" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "individuals" ADD CONSTRAINT "FK_d9dc0835c8509652f956f91fb23" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "individuals" DROP CONSTRAINT "FK_d9dc0835c8509652f956f91fb23"`);
        await queryRunner.query(`ALTER TABLE "job_seekers" DROP CONSTRAINT "FK_ea25e977504f0b51eb5875b1055"`);
        await queryRunner.query(`ALTER TABLE "recruiters" DROP CONSTRAINT "FK_13de46128ebcd3acb192f6b4dd9"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "individuals"`);
        await queryRunner.query(`DROP TABLE "job_seekers"`);
        await queryRunner.query(`DROP TABLE "recruiters"`);
    }

}
