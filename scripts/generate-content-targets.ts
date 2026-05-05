import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { discoverContentTargets } from "../cms/content-targets";

const root = process.cwd();

async function listJsonFiles(dir: string): Promise<string[]> {
  const items = await readdir(join(root, dir), { withFileTypes: true });
  const files = await Promise.all(
    items.map(async (item) => {
      const path = `${dir}/${item.name}`;
      if (item.isDirectory()) return listJsonFiles(path);
      if (item.isFile() && item.name.endsWith(".json")) return [path];
      return [];
    }),
  );

  return files.flat();
}

async function main() {
  const files = await listJsonFiles("src/content");
  const targets = (
    await Promise.all(
      files.map(async (file) => {
        const raw = await readFile(join(root, file), "utf8");
        return discoverContentTargets(file, raw, JSON.parse(raw));
      }),
    )
  ).flat();

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
