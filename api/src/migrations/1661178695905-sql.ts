import {MigrationInterface, QueryRunner} from "typeorm";

export class sql1661178695905 implements MigrationInterface {
    name = 'sql1661178695905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`items\` (\`id\` varchar(36) NOT NULL, \`order\` int UNSIGNED NOT NULL, \`content\` varchar(80) NOT NULL, \`is_done\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`idx_items_order\` (\`order\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_items_order\` ON \`items\``);
        await queryRunner.query(`DROP TABLE \`items\``);
    }

}
