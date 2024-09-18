import { createConnection } from "./connection.js";

export async function getPlaca(subject) {
  try {
    const connection = await createConnection(subject);

    const query = "SELECT Brutto FROM ModelDanychContainer.Wynagrodzenia";
    const result = await connection.query(query);

    const bruttoValues = result.recordset.map((row) => row.Brutto);

    await connection.close();
    
    return bruttoValues;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
