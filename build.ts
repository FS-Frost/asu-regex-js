import { BuildConfig, Target } from "bun";
import fs from "node:fs/promises";

console.log("Generating declaration file...");
Bun.spawnSync(["bun", "dts-bundle-generator", "src/asu.ts", "--out-file", "build/asu.d.ts"]);
const dtsContent = await fs.readFile("./build/asu.d.ts");

const buildDir = "./build";
if (await fs.exists(buildDir)) {
    await fs.rm(buildDir, {
        recursive: true,
        force: true,
    });
}

let config: BuildConfig = {
    entrypoints: ["./src/asu.ts"],
    outdir: "./build",
    sourcemap: "external",
};

const targets: Target[] = [
    "browser", "bun", "node",
];

console.log("Bundling...");
for (const target of targets) {
    config.target = target;
    config.minify = false;
    config.naming = {
        entry: `asu.${target}.js`,
    };
    await Bun.build(config);
    await fs.writeFile(`./build/asu.${target}.d.ts`, dtsContent);

    config.minify = true;
    config.naming = {
        entry: `asu.${target}.min.js`,
    };
    await Bun.build(config);
    await fs.writeFile(`./build/asu.${target}.min.d.ts`, dtsContent);
}

console.log(`Out directory: ${buildDir}`);

Bun.spawnSync(["cp", "build/asu.browser.js", "examples/asu.browser.js"]);
