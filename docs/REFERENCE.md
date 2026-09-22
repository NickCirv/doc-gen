# doc-gen — command reference

[Overview](../README.md) · [Research record](RESEARCH.md)

Describes revision `c419dbebba05cd3aa15420bcaf1117a01c028b20`. Available modules were source-inspected; the missing parser prevents verification of the historical command syntax.

> **Startup blocked.** The pinned tree is missing `src/index.js`, imported by `bin/gen.js`. The declared CLI cannot start from this source checkout until that module is supplied. README-generation modules exist, but the quickstart is currently blocked.

## Workflow

Detects language, framework, package manager, scripts and entry points from known files, then assembles Markdown. The historical README describes a `readme --dir PATH --preview` interface, but its argument parser is absent from this revision; these flags and write behavior cannot be verified.

The historical interface proposes `--dir` for the target directory. Preview output is not evidence that the target application works.

```bash
node bin/gen.js readme --dir ../your-project --preview
```

## Historical intended interface — unverified

| Historical control | Purpose described by the old README; parser unavailable |
| --- | --- |
| `readme` | Select README generation |
| `--dir PATH` | Choose the project to inspect |
| `--preview` | Print generated Markdown instead of replacing README.md |

## Interpretation and side effects

The pinned tree is missing `src/index.js`, imported by `bin/gen.js`. The declared CLI cannot start from this source checkout until that module is supplied. README-generation modules exist, but the quickstart is currently blocked. Detection is heuristic and generated sections can contain placeholder clone URLs or inferred usage. Review every command and claim before publication. Do not rely on `--preview` as a safe mode until the missing parser is restored and tested.

## Implementation reference

- [package.json](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/package.json)
- [bin/gen.js](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/bin/gen.js)
- [test/smoke.test.js](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/test/smoke.test.js)
