import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportorBlockTables1761596908867 implements MigrationInterface {
    name = 'AddedReportorBlockTables1761596908867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_verifications_purpose_enum" AS ENUM('signup', 'forgot_password', 'password')`);
        await queryRunner.query(`CREATE TABLE "user_verifications" ("id" SERIAL NOT NULL, "code" character varying(6), "passwordHash" text, "purpose" "public"."user_verifications_purpose_enum" NOT NULL, "isUsed" boolean NOT NULL DEFAULT false, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_3269a92433d028916ab342b94fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationCode"`);
        await queryRunner.query(`ALTER TABLE "user_verifications" ADD CONSTRAINT "FK_b5aadfc04db5b23d06c0447e0f4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_verifications" DROP CONSTRAINT "FK_b5aadfc04db5b23d06c0447e0f4"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationCode" character varying(6)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "user_verifications"`);
        await queryRunner.query(`DROP TYPE "public"."user_verifications_purpose_enum"`);
    }

}
