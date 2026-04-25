# Agent Instructions

## Commands
- **Test**: `bun test` (tests are co-located in `src/**/*.test.ts` and use `bun:test`, not Jest/Vitest).
- **Lint**: `bun run lint` (uses eslint).
- **Check**: `bun run check` (runs test then lint).
- **Build**: `bun run bundle` (runs `build.ts` which uses Bun's bundler and `dts-bundle-generator`).
- **Docs**: `bun docs` (generates typedoc into `examples/docs`).

## Repository Quirks & Architecture
- **GitHub Pages Root (`examples/`)**: The `examples` directory serves as the root for GitHub Pages. It contains the interactive playground (`app.js`, `index.html`), the bundled library artifacts (`examples/build`), and the generated documentation (`examples/docs`). Do not remove or ignore this folder when dealing with outputs.
- **Entrypoint**: `src/asu.ts` is the main export used for bundling and publishing via JSR (`jsr.json`).
- **Regex Patterns**: The library uses `magic-regexp` for all regex patterns (see `src/regex.ts`). Modify patterns there using the fluent API rather than writing raw regex strings inline.
- **Platform Compatibility**: The build targets `browser`, `bun`, and `node`. Avoid introducing environment-specific dependencies (like Node's `fs` or `path`) into the core parser logic.
- **ASS Specification**: The reference specification is provided locally in `ASS File Format Specification.html`. Always refer to it when interpreting or adding support for new SSA/ASS features to avoid guessing the syntax.

## Code Style & Documentation
- **Self-Documenting Code**: Avoid JSDoc, function annotations, and inline comments. Use descriptive names for variables and functions.
- **Explicit Logic**: Refactor complex logic into small, focused, and well-named functions. The code itself is the documentation.
- **Maintain Consistency**: Follow the existing patterns in the codebase where logic flow and naming convey intent without prose.
