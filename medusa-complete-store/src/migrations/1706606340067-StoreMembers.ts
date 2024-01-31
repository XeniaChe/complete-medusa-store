// TODO: bring back after fixed:
// Error starting server. DataTypeNotSupportedError: Data type "Array" in "Store.members" is not supported by "postgres" database.

/* import { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreMembers1706606340067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "store" ADD "members" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "members"`);
  }
}
 */
