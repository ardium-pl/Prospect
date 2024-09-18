import { createConnection } from "./connection.js";

export async function getPlaca(subject) {
    try {
        console.log("Subject:", subject);
        const connection = await createConnection(subject); 
        console.log("Połączono");
        
        const query = 'SELECT Brutto FROM ModelDanychContainer.Wynagrodzenia';
        const result = await connection.query(query); 
        
        console.log("Query result:", result);  
        
        const rows = result[0] ? result[0] : result; 
        
        await connection.close(); 
        return JSON.stringify(rows.recordsets);
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}
