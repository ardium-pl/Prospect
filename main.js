import { getDatabaseSubjects } from "./sql/connection.js";
import { getPlaca } from "./sql/queries.js";

async function main() {
    const subjects = await getDatabaseSubjects();
    console.log(subjects);
    for (let subject of subjects) {
        console.log("Subject " + subject);
        try {
            const placa = await getPlaca(subject);
            console.log(placa);
        } catch (error) {
            console.error(`Error for subject ${subject}:`, error.message);
        }
    }
}

await main();
