import sql, { ConnectionPool, config as SqlConfig } from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

export async function createConnection(subject: string): Promise<ConnectionPool> {
  return sql.connect(configDataBase(subject));
}

async function getDatabaseNames(): Promise<string[]> {
  const query = `SELECT name FROM sys.databases`;
  const result = await sql.query(query);
  return result.recordset.map((db: { name: string }) => db.name);
}

function configDataBase(subject: string): SqlConfig {
  return {
    user: process.env.MSSQL_USER as string,
    server: process.env.MSSQL_SERVER as string,
    password: process.env.MSSQL_PASSWORD as string,
    port: parseInt(process.env.MSSQL_PORT as string, 10),
    database: subject,
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  };
}

export async function getDatabaseSubjects(): Promise<string[]> {
  const connection = await createConnection('master');
  const databaseNames = await getDatabaseNames();
  const subjects = databaseNames.filter((name: string) => name.startsWith('Nexo_'));
  await connection.close();
  return subjects;
}
