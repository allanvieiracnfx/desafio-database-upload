import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnTableTrasactions1609091174869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('transactions', new TableColumn({
        name: 'title',
        type: 'varchar',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('transactions', 'title');
    }

}
