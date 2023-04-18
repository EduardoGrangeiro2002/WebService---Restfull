import type { Config } from '@jest/types';
import { exec } from 'node:child_process';
import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import mysql from 'mysql';
import util from 'node:util';

dotenv.config({ path: '.env.testing' });

const execSync = util.promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private dbName: string | undefined;
  private connectionString: string;

  constructor(config: Config.ProjectConfig) {
    super(config);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;

    this.dbName = dbName;
    this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`npx prisma migrate dev`);

    return super.setup();
  }

  async teardown() {
    const client = mysql.createConnection({
      host     : 'localhost',
      user     : 'api',
      password : '123456',
      database : 'scp_test'
    });
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS ${this.dbName}`);
    await client.end();
  }
}