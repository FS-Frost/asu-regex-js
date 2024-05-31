import { BuildConfig, Target } from "bun";
import fs from "node:fs/promises";

const buildDir = "./examples/build";
{
    console.log("Generating declaration file...");
    const cmdAArgs: string[] = ["bun", "dts-bundle-generator", "src/asu.ts", "--out-file", `${buildDir}/asu.d.ts`, "--no-check"];
    console.log(cmdAArgs.join(" "));
    const cmdResult = Bun.spawnSync(cmdAArgs);
    if (!cmdResult.success) {
        console.error(`ERROR: DTS generation failed with exit code ${cmdResult.exitCode}`);
        console.error(cmdResult.stderr.toString());
        process.exit(1);
    }
}

const dtsContent = await fs.readFile(`${buildDir}/asu.d.ts`);
if (await fs.exists(buildDir)) {
    await fs.rm(buildDir, {
        recursive: true,
        force: true,
    });
}

const config: BuildConfig = {
    entrypoints: ["./src/asu.ts"],
    outdir: buildDir,
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

    let fileName = `asu.${target}.d.ts`;
    await Bun.build(config);
    await fs.writeFile(`${buildDir}/${fileName}`, dtsContent);

    config.minify = true;
    config.naming = {
        entry: `asu.${target}.min.js`,
    };

    fileName = `asu.${target}.min.d.ts`;
    await Bun.build(config);
    await fs.writeFile(`${buildDir}/${fileName}`, dtsContent);
}

console.log(`Out directory: ${buildDir}`);

{
    const files = await fs.readdir(buildDir);
    await fs.writeFile(`./examples/bundles/files.json`, JSON.stringify(files, null, 2));
}

console.log("DONE");
