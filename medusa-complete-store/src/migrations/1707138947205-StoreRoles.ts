import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
  Table,
  TableIndex
} from 'typeorm';

export class StoreRoles1707138947205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // PERMISSION
    await queryRunner.createTable(
      new Table({
        name: 'permission',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true
          }
        ]
      })
    );

    // ROLE
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'store_id',
            type: 'varchar',
            isUnique: true,
            isNullable: true
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'role',
      new TableForeignKey({
        columnNames: ['store_id'],
        referencedTableName: 'store',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL'
      })
    );

    // Create join table for many-to-many relationship with Permission entity
    await queryRunner.createTable(
      new Table({
        name: 'role_permissions',
        columns: [
          {
            name: 'role_id',
            type: 'varchar'
          },
          {
            name: 'permission_id',
            type: 'varchar'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['role_id'],
            referencedTableName: 'role',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          },
          {
            columnNames: ['permission_id'],
            referencedTableName: 'permission',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          }
        ]
      })
    );

    // STORE-ROLE
    await queryRunner.addColumn(
      'store',
      new TableColumn({
        name: 'role_id',
        type: 'varchar',
        isNullable: true
      })
    );

    await queryRunner.createForeignKey(
      'store',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['store_id'],
        referencedTableName: 'role',
        onDelete: 'SET NULL'
      })
    );

    // USER-ROLE
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'role_id',
        type: 'varchar',
        isNullable: true
      })
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'role_id',
        columnNames: ['role_id']
      })
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'SET NULL'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // STORE-ROLE
    const tableStore = await queryRunner.getTable('store');
    const fkStoreToRole = tableStore.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('role_id') !== -1
    );
    if (fkStoreToRole) await queryRunner.dropForeignKey('store', fkStoreToRole);

    // USER-ROLE
    const tableUser = await queryRunner.getTable('user');
    const fkUserToRole = tableUser.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('role_id') !== -1
    );
    if (fkUserToRole) await queryRunner.dropForeignKey('user', fkUserToRole);
    await queryRunner.dropColumn('user', 'role_id');

    // ROLE
    await queryRunner.dropTable('role_permissions');

    const tableRole = await queryRunner.getTable('role');
    const fkRoleToStore = tableRole.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('store_id') !== -1
    );
    if (fkRoleToStore) await queryRunner.dropForeignKey('role', fkRoleToStore);
    await queryRunner.dropTable('role');

    // PERMISSION
    await queryRunner.dropTable('permission');
  }
}
