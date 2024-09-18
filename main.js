import { getDatabaseSubjects } from "./sql/connection.js";
import { getPlaca } from "./sql/queries.js";
import { runPuppeteer, loginToPodatkiPodatki } from "./puppeteer/puppeteer.js";

async function main() {
  const subjects = await getDatabaseSubjects();
  for (let subject of subjects) {
    try {
      const bruttoValues = await getPlaca(subject);

      const summedValue = bruttoValues.reduce((acc, curr) => acc + curr, 0);
      const roundedSum = parseFloat(summedValue.toFixed(2));

      await loginToPodatkiPodatki();


      
      console.log("Summed Brutto value for subject (rounded):", roundedSum);
    } catch (error) {
      console.error(`Error for subject ${subject}:`, error.message);
    }
  }
}

await main();
