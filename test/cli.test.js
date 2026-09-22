import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, readFile, readdir, rm, symlink, link } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
const bin = fileURLToPath(new URL('../bin/gen.js', import.meta.url))
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'doc-gen-test-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await writeFile(join(root, 'package.json'), JSON.stringify({ name: 'sample-project', description: 'A fixture application', scripts: { test: 'node --test' } }))
  return root
}
const cli = (root, args) => spawnSync(process.execPath, [bin, ...args], { cwd: root, encoding: 'utf8' })
test('help and no arguments are successful and do not modify the fixture', async t => {
  const root = await fixture(t), before = await readdir(root)
  for (const args of [[], ['--help'], ['readme', '--help']]) {
    const result = cli(root, args)
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stdout, /Usage:/)
  }
  assert.deepEqual(await readdir(root), before)
})
test('preview emits the complete draft while preserving an existing README', async t => {
  const root = await fixture(t)
  await writeFile(join(root, 'README.md'), 'Keep my documentation')
  const result = cli(root, ['readme', '--dir', root, '--preview'])
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /# sample-project/)
  assert.match(result.stdout, /A fixture application/)
  assert.match(result.stdout, /## License/)
  assert.equal(await readFile(join(root, 'README.md'), 'utf8'), 'Keep my documentation')
})
test('readme writes detected project content into the selected directory', async t => {
  const root = await fixture(t)
  const result = cli(root, ['readme', '--dir', root])
  assert.equal(result.status, 0, result.stderr)
  const output = await readFile(join(root, 'README.md'), 'utf8')
  assert.match(output, /# sample-project/)
  assert.match(output, /npm run test/)
})
test('unknown commands, missing values and invalid directories fail without writing', async t => {
  const root = await fixture(t)
  for (const args of [['api'], ['changelog'], ['readme', '--wat'], ['readme', '--dir'], ['readme', '--dir', join(root, 'missing')], ['readme', '--dir', join(root, 'package.json')]]) {
    const result = cli(root, args)
    assert.notEqual(result.status, 0)
    assert.ok(result.stderr.trim())
  }
  assert.deepEqual(await readdir(root), ['package.json'])
})

test('write refuses symlink and hardlink README targets without modifying their content', async t => {
  for (const createLink of [symlink, link]) {
    const root = await fixture(t)
    const outside = await mkdtemp(join(tmpdir(), 'doc-gen-outside-'))
    t.after(() => rm(outside, { recursive: true, force: true }))
    const target = join(outside, 'protected.md')
    await writeFile(target, 'Protected external document')
    await createLink(target, join(root, 'README.md'))
    const result = cli(root, ['readme', '--dir', root])
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /refusing/)
    assert.equal(await readFile(target, 'utf8'), 'Protected external document')
    const preview = cli(root, ['readme', '--dir', root, '--preview'])
    assert.equal(preview.status, 0, preview.stderr)
    assert.equal(await readFile(target, 'utf8'), 'Protected external document')
  }
})
test('write refuses a README directory without changing its contents', async t => {
  const root = await fixture(t)
  const { mkdir } = await import('node:fs/promises')
  await mkdir(join(root, 'README.md'))
  const result = cli(root, ['readme', '--dir', root])
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /refusing/)
  assert.deepEqual(await readdir(join(root, 'README.md')), [])
})
