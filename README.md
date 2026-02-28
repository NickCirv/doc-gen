# doc-gen

Auto-generate a README for any codebase in seconds — language-aware, framework-detected, actually useful.

<p align="center">
  <img src="https://img.shields.io/npm/v/doc-gen.svg" alt="npm version" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg" alt="node >= 18" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license" />
</p>

## Why

Every project needs a README. Nobody wants to write it. `doc-gen` reads your codebase — `package.json`, lockfiles, config files, entry points, scripts — and generates a complete, accurate README with the right install command, usage block, scripts table, and contributing guide for your actual language and package manager.

## Quick Start

```bash
npx doc-gen readme
```

Writes `README.md` to the current directory.

## What It Detects

- **Language** — JavaScript, TypeScript, Python, Rust, Go, Ruby (from manifest files)
- **Framework** — Next.js, Nuxt, SvelteKit, Express, Fastify, Hono, Koa, React, Vue, FastAPI, Django, Flask, Gin, Fiber, Echo
- **Package manager** — npm, pnpm, yarn, bun, pip, pipenv, cargo, go
- **Build tool** — Vite, Webpack, esbuild, Rollup, Turbopack, tsup, Make
- **Test framework** — Vitest, Jest, Mocha, AVA, Playwright, pytest, cargo test
- **Entry points** — scans for `src/index.js`, `main.py`, `cmd/main.go`, `src/main.rs`, etc.
- **Scripts** — reads from `package.json` scripts and maps to the correct package manager run command

## What Gets Generated

- Title and description from manifest
- Badges (version, language, framework, license)
- Install command (correct for the detected package manager and language)
- Usage block (from scripts or entry points)
- Scripts table with all `start`, `dev`, `build`, `test` commands
- Test section (if a test framework is detected)
- Contributing section with clone + install instructions
- MIT license section

## Example Output

```
# my-api

A Fastify TypeScript project.

![version](https://img.shields.io/badge/version-1.0.0-blue)
![language](https://img.shields.io/badge/language-TypeScript-6366F1)
![framework](https://img.shields.io/badge/framework-Fastify-8B5CF6)
![license](https://img.shields.io/badge/license-MIT-14B8A6)

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm run start
npm run dev
npm run build
\`\`\`

## Scripts

| Command | Description |
| --- | --- |
| `npm run start` | node src/index.js |
| `npm run dev` | tsx watch src/index.ts |
| `npm run build` | tsc -p tsconfig.json |
| `npm run test` | vitest run |

## Testing

This project uses Vitest.

\`\`\`bash
npm run test
\`\`\`
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--dir <path>` | Project root to analyze | current directory |
| `--preview` | Print to stdout instead of writing file | off |

## Use in CI

```yaml
- name: Regenerate docs
  run: npx doc-gen readme --dir .
```

## Install Globally

```bash
npm i -g doc-gen
```

## License

MIT
