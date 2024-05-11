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
    entrypoints: ['./src/asu.ts'],
    sourcemap: "external",
};

const targets: Target[] = [
    "browser", "bun", "node",
];

for (const target of targets) {
    config.target = target;
    config.outdir = `./build/${target}`;
    config.minify = true;
    await Bun.build(config);

    config.minify = true;
    config.outdir = `./build/min/${target}`;
    await Bun.build(config);
}

console.log(`Out directory: ${buildDir}`);
