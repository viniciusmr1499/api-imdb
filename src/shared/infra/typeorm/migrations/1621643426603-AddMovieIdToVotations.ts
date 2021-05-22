import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddMovieIdToVotations1621643426603 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('votations', new TableColumn({
      name: 'movie_votations_id',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.createForeignKey('votations',
      new TableForeignKey({
        name: 'votationMovie',
        columnNames: ['movie_votations_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('votations', 'votationMovie')

    await queryRunner.dropColumn('votations', 'movie_votations_id')
  }
}
