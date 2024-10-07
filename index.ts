import { getDatabaseSubjects } from "./src/sql/connection.ts";

async function main() {
  const subjects = await getDatabaseSubjects();
  await Promise.all(subjects.map(async subject => console.log(subject)));
}

await main();
