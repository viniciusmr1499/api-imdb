import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddUserIdToVotations1621630946049 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('votations', new TableColumn({
      name: 'user_votations_id',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.createForeignKey('votations',
      new TableForeignKey({
        name: 'votationUser',
        columnNames: ['user_votations_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('votations', 'votationUser')

    await queryRunner.dropColumn('votations', 'user_votations_id')
  }
}
