import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookGenreJoinTable1750825860671 implements MigrationInterface {
    name = 'AddBookGenreJoinTable1750825860671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book_genre\` (\`book_id\` int NOT NULL, \`genre_id\` int NOT NULL, INDEX \`IDX_fa09ea26c5837f4f4160ae5571\` (\`book_id\`), INDEX \`IDX_df2409dcd1dade9038a7d79e65\` (\`genre_id\`), PRIMARY KEY (\`book_id\`, \`genre_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_genre\` ADD CONSTRAINT \`FK_fa09ea26c5837f4f4160ae55715\` FOREIGN KEY (\`book_id\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_genre\` ADD CONSTRAINT \`FK_df2409dcd1dade9038a7d79e653\` FOREIGN KEY (\`genre_id\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_genre\` DROP FOREIGN KEY \`FK_df2409dcd1dade9038a7d79e653\``);
        await queryRunner.query(`ALTER TABLE \`book_genre\` DROP FOREIGN KEY \`FK_fa09ea26c5837f4f4160ae55715\``);
        await queryRunner.query(`DROP INDEX \`IDX_df2409dcd1dade9038a7d79e65\` ON \`book_genre\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa09ea26c5837f4f4160ae5571\` ON \`book_genre\``);
        await queryRunner.query(`DROP TABLE \`book_genre\``);
    }

}
