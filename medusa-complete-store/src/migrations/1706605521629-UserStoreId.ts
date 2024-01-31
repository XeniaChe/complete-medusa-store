import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserStoreId1706605521629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "store_id" character varying`);
    await queryRunner.query(`CREATE INDEX "UserStoreId" ON "user" ("store_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP Index "public"."UserStoreId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "store_id"`);
  }
}
