import { build } from "esbuild";
import { builtinModules } from "module";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const external = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
];

build({
  entryPoints: ["server/cluster.ts", "server/_core/index.ts"],
  platform: "node",
  bundle: true,
  format: "esm",
  outdir: "dist",
  external,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
