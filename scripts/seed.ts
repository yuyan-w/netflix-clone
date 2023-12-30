import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("./scripts/movie.json", "utf-8"));

  for (const movie of data) {
    await prisma.movie.create({
      data: movie,
    });
  }

  console.log("Data insertion complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
