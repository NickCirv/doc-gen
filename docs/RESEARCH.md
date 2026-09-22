# doc-gen — research record

> **Known startup blocker.** The pinned tree is missing `src/index.js`, imported by `bin/gen.js`. The declared CLI cannot start from this source checkout until that module is supplied. README-generation modules exist, but the quickstart is currently blocked.

## Revision and scope

- Repository: [NickCirv/doc-gen](https://github.com/NickCirv/doc-gen)
- Commit: `c419dbebba05cd3aa15420bcaf1117a01c028b20`
- Tree: `25421f892700d3c884bd062e245c23c4e82297ba`
- Captured: 9 of 9 eligible text files (all eligible text files).
- Recursive tree truncated: `False`.
- Runtime verification: **unverified**; no repository code, installation or test command was executed.

The captured file inventory is broader than the semantic review. Authoring inspected package metadata, entrypoint/argument handling and implementation paths relevant to the claims below, plus test declarations. This is documentation research, not a line-by-line security audit. Generated/binary artifacts, lockfiles and file types outside the acquisition filter were not inspected.

## Claim and evidence

| Claim | Pinned evidence | Status |
| --- | --- | --- |
| Runtime requirement and executable mapping | [package.json](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/package.json) | verified in manifest; installation unverified |
| Draft a README from locally detected project metadata and tooling. | [implementation](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/bin/gen.js) | partially verified by static implementation review |
| Operational limits and side effects | [implementation](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/bin/gen.js) and source map in [reference](REFERENCE.md) | partially verified; runtime unverified |
| Test command definition | [package.json](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/package.json) | verified as a declaration only |

## Findings carried into the rewrite

Detection is heuristic and generated sections can contain placeholder clone URLs or inferred usage. Review every command and claim before publication. The historical README describes a preview flag and default README replacement, but the CLI parser is absent; those behaviors are not verified and preview must not be relied on as a safe mode.

No runtime checks were executed for this documentation review. The committed smoke test checks entrypoint JavaScript syntax; it does not exercise the command behavior.

## Documentation inventory and disposition

| Existing document | Disposition |
| --- | --- |
| [README.md](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/README.md) | Rewritten overview; historical copy remains at this pinned URL. |

New supporting documents: `docs/REFERENCE.md` and `docs/RESEARCH.md`. No original source or protected legal/security file was changed.

## Protected-file evidence

- `LICENSE` SHA-256 `68729cab364d82364078b08d8580ccfa51dc69c81a7d64e8d8d47a1da6c9349d`.

## Remaining verification

Clean installation, useful-command execution, malformed input, side-effect boundaries, platform compatibility and end-to-end tests remain unverified. Package-registry availability and live API destinations were not checked. No performance, customer-adoption, compliance or production-readiness claim is made.

## Captured evidence index

- [LICENSE](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/LICENSE) · blob `05b804beeec7d1a6c933d087387ba4adf6463d93`.
- [README.md](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/README.md) · blob `a62477d50f0f7604115911232c29a8cba586736a`.
- [package.json](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/package.json) · blob `c56aa6302fb58ed9a04122929fb5f3a48897a439`.
- [.github/workflows/ci.yml](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/.github/workflows/ci.yml) · blob `44515034a394670de44454a7a1bd2c7ef0c9836e`.
- [bin/gen.js](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/bin/gen.js) · blob `73dc7bfbd293de1a27d6b7edae07dd23c6021fe4`.
- [src/detector.js](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/src/detector.js) · blob `9aa54991f3e7c566d1d9ffcabd628db916e3a4d9`.
- [src/formatter.js](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/src/formatter.js) · blob `715300ae9eb58e70830f692ab162c02a00ecad55`.
- [src/readme.js](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/src/readme.js) · blob `a75f34147ee8ddcf3bd12b4ca173d06f0777a57f`.
- [test/smoke.test.js](https://github.com/NickCirv/doc-gen/blob/c419dbebba05cd3aa15420bcaf1117a01c028b20/test/smoke.test.js) · blob `ff3cf72e2c85320a8967e681ccde38d2a80f6e92`.

## Tree files outside the captured text set

These paths were mapped but their contents were not acquired in this research pass:

- `banner.svg`
