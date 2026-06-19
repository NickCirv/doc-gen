<div align="center">

# doc-gen

**Generate an accurate README for any codebase in seconds — language-aware, framework-detected.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue?labelColor=0B0A09)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?labelColor=0B0A09)](https://nodejs.org)

</div>

## Install

```bash
npx github:NickCirv/doc-gen
```

## Usage

```bash
# Write README.md to the current project
npx github:NickCirv/doc-gen readme

# Analyse a different directory
npx github:NickCirv/doc-gen readme --dir ./my-project

# Preview without writing
npx github:NickCirv/doc-gen readme --preview
```

| Flag | Description |
|------|-------------|
| `--dir <path>` | Project root to analyse (default: current directory) |
| `--preview` | Print to stdout instead of writing `README.md` |

## What it does

`doc-gen` reads your project manifest, lockfiles, config files, and entry points to detect the language, framework, package manager, build tool, and test framework. It then writes a complete `README.md` with the correct install command, usage block, scripts table, and contributing guide for your actual stack — no templates to fill in, no guessing.

Supports JavaScript, TypeScript, Python, Rust, Go, and Ruby. Detects Next.js, Express, FastAPI, Django, Gin, and 15+ other frameworks automatically.

---
<sub>Node ≥18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
