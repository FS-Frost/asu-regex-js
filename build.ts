import { BuildConfig, Target } from "bun";
import fs from "node:fs/promises";

{
    console.log("Generating declaration file...");
    const cmdAArgs: string[] = ["bun", "dts-bundle-generator", "src/asu.ts", "--out-file", "build/asu.d.ts", "--no-check"];
    console.log(cmdAArgs.join(" "));
    const cmdResult = Bun.spawnSync(cmdAArgs);
    if (!cmdResult.success) {
        console.error(`ERROR: DTS generation failed with exit code ${cmdResult.exitCode}`);
        console.error(cmdResult.stderr.toString());
        process.exit(1);
    }
}

const dtsContent = await fs.readFile("./build/asu.d.ts");

const buildDir = "./build";
if (await fs.exists(buildDir)) {
    await fs.rm(buildDir, {
        recursive: true,
        force: true,
    });
}

const config: BuildConfig = {
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

{
    console.log("Copying browser build to examples...");
    const cmdArgs: string[] = ["cp", "build/asu.browser.js", "examples/asu.browser.js"];
    console.log(cmdArgs.join(" "));
    const cmdResult = Bun.spawnSync(cmdArgs);
    if (!cmdResult.success) {
        console.error(`ERROR: failed to copy browser build to examples with exit code ${cmdResult.exitCode}`);
        console.error(cmdResult.stderr.toString());
        process.exit(1);
    }

}

console.log("DONE");
