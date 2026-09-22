import { Command } from 'commander'
import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { generateReadmeCommand } from './readme.js'

/** Dispatch only the README workflow implemented in this checkout. */
export async function run(argv = process.argv.slice(2), { stdout = process.stdout, stderr = process.stderr } = {}) {
  const program = new Command()
    .name('doc-gen')
    .description('Draft a README from local project metadata. API and changelog generators are not implemented.')
    .exitOverride()
    .configureOutput({ writeOut: text => stdout.write(text), writeErr: text => stderr.write(text) })
  program.command('readme')
    .description('Generate README.md; default writes replace an existing README')
    .option('--dir <path>', 'Project directory', '.')
    .option('--preview', 'Print the full draft without writing files', false)
    .action(async options => {
      const root = resolve(options.dir)
      if (!(await stat(root)).isDirectory()) throw new Error(`Not a directory: ${root}`)
      await generateReadmeCommand({ ...options, dir: root })
    })
  try {
    if (argv.length === 0) { program.outputHelp(); return 0 }
    await program.parseAsync(argv, { from: 'user' })
    return 0
  } catch (error) {
    if (error.code?.startsWith('commander.')) return error.exitCode ?? 1
    stderr.write(`doc-gen: ${error.message}\n`)
    return 1
  }
}
