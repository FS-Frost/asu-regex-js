import { BuildConfig, Target } from "bun";
import fs from "node:fs/promises";

const buildDir = "./build";
if (await fs.exists(buildDir)) {
    await fs.rm(buildDir, {
        recursive: true,
        force: true,
    });
}

let config: BuildConfig = {
    entrypoints: ['./src/index.ts'],
    outdir: "./build",
    sourcemap: "external",
};

const targets: Target[] = [
    "browser", "bun", "node",
];

for (const target of targets) {
    config.target = target;
    config.minify = false;
    config.naming = {
        entry: `asu.${target}.js`,
    };
    await Bun.build(config);

    config.minify = true;
    config.naming = {
        entry: `asu.${target}.min.js`,
    };
    await Bun.build(config);
}

console.log(`Out directory: ${buildDir}`);
