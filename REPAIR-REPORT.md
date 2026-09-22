# doc-gen — local repair report

## Candidate scope

Base public source: `c419dbebba05cd3aa15420bcaf1117a01c028b20`. Changes exist only in this isolated repair candidate, not the captured source, an original checkout or an upstream repository. No remote publication was performed.

## Changes

Added `src/index.js` using Commander to expose only the existing README generator; entrypoint awaits dispatch and propagates exit status. Validates the selected directory, rejects unsupported commands/options, and makes no-argument invocation help-only. README preview now prints the full draft. Handler failures propagate to the dispatcher instead of terminating inside the module. Package description now matches the supported feature. Added temporary-fixture behavior tests and an installation lockfile.

The README uses the approved portfolio documentation style and clearly labels candidate status. Its banner reference is resolved by the root portfolio packaging stage; no artwork or license text was changed here.

## Executed verification

- `npm install --ignore-scripts --no-audit --no-fund`: succeeded; dependency lifecycle scripts disabled.
- `node -v`: `v26.7.0`.
- `npm test`: **7 passed, zero failed** on this candidate.

Tests use temporary fixtures and remove only their own fixtures. No target-repository code was executed. All test-generation requests were mocked. The pre-existing smoke test remains alongside meaningful command behavior tests.

## Residual limits

The existing template still hardcodes MIT/version badges, includes placeholder clone URLs and infers package-install commands without publication evidence. Existing README files are replaced by the explicit non-preview generation command. Detector heuristics and malformed-manifest fallback remain unchanged. No API/changelog/tree generators were invented.

Dependency installation is not a vulnerability or license audit. The test suite establishes the exercised local behavior, not production readiness. Independent review and root packaging remain pending.

## Gate

**PASS for local behavior tests; REVISE for upstream delivery pending independent review.** No publication authority is implied.

## Independent-review correction

README writes now reject symlink, hardlink and non-file destinations. The file is opened without following symlinks, then its identity, type and link count are checked through the handle before truncation; new files use exclusive creation. Regression tests confirm external target contents remain unchanged for both symbolic and hard links, and previews remain nonwriting. The final suite was rerun: 7 passed, zero failed.
