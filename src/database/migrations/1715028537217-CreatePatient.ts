import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatient1715028537217 implements MigrationInterface {
  name = 'CreatePatient1715028537217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE file (
                id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
                path VARCHAR(255) NOT NULL
            );`,
    );
    await queryRunner.query(`
      CREATE TABLE patient (
                id CHAR(36) NOT NULL PRIMARY KEY,
                email VARCHAR(255) UNIQUE,
                firstName VARCHAR(255),
                lastName VARCHAR(255),
                phoneNumber VARCHAR(20),
                createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP NULL,
                photoId CHAR(36) UNIQUE
            );`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_58e4dbff0e1a32a9bdc861bb29\` ON patient (\`firstName\`); `,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_f0e1b4ecdca13b177e2e3a0613\` ON \`patient\` (\`lastName\`); `,
    );
    await queryRunner.query(`
            ALTER TABLE \`patient\`
            ADD CONSTRAINT \`FK_75e2be4ce11d447ef43be0e374f\`
            FOREIGN KEY (\`photoId\`) REFERENCES \`file\`(\`id\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`patient\` DROP FOREIGN KEY \`FK_75e2be4ce11d447ef43be0e374f\`;
    `);
    await queryRunner.query(
      `DROP INDEX \`public\`.\`IDX_f0e1b4ecdca13b177e2e3a0613\`;`,
    );
    await queryRunner.query(
      `DROP INDEX \`public\`.\`IDX_58e4dbff0e1a32a9bdc861bb29\`;`,
    );
    await queryRunner.query(`DROP TABLE patient`);
    await queryRunner.query(`DROP TABLE file`);
  }
}
