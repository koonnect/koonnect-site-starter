import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { getStarterTargetSeeds, hydrateTargets } from "../cms/content-targets";

const root = process.cwd();

async function main() {
  const seeds = getStarterTargetSeeds();
  const files = await Promise.all(
    Array.from(new Set(seeds.map((seed) => seed.file))).map(async (file) => {
      const raw = await readFile(join(root, file), "utf8");
      return [file, { raw, json: JSON.parse(raw) }] as const;
    }),
  );

  const targets = hydrateTargets(seeds, Object.fromEntries(files));
  const outputPath = join(root, "cms/.targets.json");

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), targetCount: targets.length, targets }, null, 2)}\n`,
  );
  console.log(`Generated ${targets.length} content targets -> ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
