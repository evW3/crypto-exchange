import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';
import { createDefaultLogin } from 'src/utils/functions.utils';
import { userAccountStatusses } from 'src/core/static/enums';

export class Users1623102765500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'email',
                    type: 'text'
                },
                {
                    name: 'password',
                    type: 'text'
                },
                {
                    name: 'password_salt',
                    type: 'text'
                },
                {
                    name: 'login',
                    type: 'text',
                    default: '\'' + createDefaultLogin() + '\''
                },
                {
                    name: 'first_name',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'last_name',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'country_of_residence',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'home_country',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'phone_number',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'phone_number',
                    type: 'date',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: [...Object.values(userAccountStatusses)],
                    default: userAccountStatusses.CREATE_ACCOUNT
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('users');
        await queryRunner.dropTable('users');
    }
}