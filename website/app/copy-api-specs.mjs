// Copies the bundled OTM API specifications from the authoritative ../../otm-api
// folder into static/api, so they are served as static assets of the website.
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(appDir, "..", "..", "otm-api");
const targetDir = join(appDir, "static", "api");

const specs = readdirSync(sourceDir).filter((file) =>
  /^otm-api-v.+\.yaml$/.test(file)
);
if (specs.length === 0) {
  throw new Error(`No OTM API specifications found in ${sourceDir}`);
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
for (const spec of specs) {
  copyFileSync(join(sourceDir, spec), join(targetDir, spec));
}
console.log(`Copied ${specs.length} OTM API specifications to static/api`);
