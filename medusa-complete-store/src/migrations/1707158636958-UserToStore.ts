import { MigrationInterface, QueryRunner, TableIndex, TableColumn, TableForeignKey } from 'typeorm';

export class UserToStore1707158636958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "user" ADD "store_id" character varying`);
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'store_id',
        type: 'character varying',
        isNullable: true,
        isUnique: true
      })
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'UserStoreId',
        columnNames: ['store_id']
      })
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['store_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'store',
        onDelete: 'SET NULL'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('store_id') !== -1);

    await queryRunner.dropForeignKey('user', foreignKey);
    await queryRunner.dropColumn('user', 'store_id');
  }
}
