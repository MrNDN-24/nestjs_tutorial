import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixBookGenreJoin1750071301561 implements MigrationInterface {
  name = 'FixBookGenreJoin1750071301561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`book_genres_genre\` (\`bookId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_31d658e0af554165f4598158c5\` (\`bookId\`), INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` (\`genreId\`), PRIMARY KEY (\`bookId\`, \`genreId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_31d658e0af554165f4598158c55\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_83bd32782d44d9db3d68c3f58c1\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_83bd32782d44d9db3d68c3f58c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_31d658e0af554165f4598158c55\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` ON \`book_genres_genre\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_31d658e0af554165f4598158c5\` ON \`book_genres_genre\``,
    );
    await queryRunner.query(`DROP TABLE \`book_genres_genre\``);
  }
}
