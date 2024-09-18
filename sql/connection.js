import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

export async function createConnection(subject) {
  return sql.connect(configDataBase(subject));
}

async function getDatabaseNames() {
  const query = `SELECT name FROM sys.databases`;
  const result = await sql.query(query);
  return result.recordset.map(db => db.name);
}

function configDataBase(subject) {
  return {
    user: process.env.MSSQL_USER,
    server: process.env.MSSQL_SERVER,
    password: process.env.MSSQL_PASSWORD,
    port: parseInt(process.env.MSSQL_PORT),
    database: subject,
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  };
}

export async function getDatabaseSubjects(){
    await createConnection('master');
    const databaseNames = await getDatabaseNames();
    const subjects = databaseNames.filter(name => name.startsWith('Nexo_'));
    await sql.close();
    return subjects
}


