import { readFileSync, writeFileSync, existsSync, lstatSync, openSync, fstatSync, ftruncateSync, closeSync, constants } from 'fs'
import { join, resolve } from 'path'
import { detectProject } from './detector.js'
import {
  h1, h2, h3, codeBlock, inlineCode, bulletList, badge,
  joinSections, printSuccess, printError, printSection, printPreview
} from './formatter.js'

/**
 * Generate install command based on package manager and language.
 */
function buildInstallBlock(profile) {
  const { packageManager, language, name } = profile

  if (language === 'Python') {
    return codeBlock(`pip install ${name}`, 'bash')
  }
  if (language === 'Rust') {
    return codeBlock(`cargo add ${name}`, 'bash')
  }
  if (language === 'Go') {
    return codeBlock(`go get github.com/your-username/${name}`, 'bash')
  }
  if (language === 'Ruby') {
    return codeBlock(`gem install ${name}`, 'bash')
  }

  const pm = packageManager || 'npm'
  if (pm === 'bun') return codeBlock(`bun add ${name}`, 'bash')
  if (pm === 'pnpm') return codeBlock(`pnpm add ${name}`, 'bash')
  if (pm === 'yarn') return codeBlock(`yarn add ${name}`, 'bash')
  return codeBlock(`npm install ${name}`, 'bash')
}

/**
 * Build usage block from entry points or scripts.
 */
function buildUsageBlock(profile) {
  const { entryPoints, scripts, language, packageManager } = profile
  const lines = []

  if (scripts && Object.keys(scripts).length > 0) {
    const pm = packageManager || 'npm'
    const run = pm === 'bun' ? 'bun run' : pm === 'pnpm' ? 'pnpm' : pm === 'yarn' ? 'yarn' : 'npm run'
    for (const [key, val] of Object.entries(scripts)) {
      if (['start', 'dev', 'build', 'test'].includes(key)) {
        lines.push(`${run} ${key}`)
      }
    }
  }

  if (lines.length === 0 && entryPoints.length > 0) {
    const entry = entryPoints[0]
    if (language === 'Python') {
      lines.push(`python ${entry}`)
    } else if (language === 'Go') {
      lines.push(`go run ${entry}`)
    } else if (language === 'Rust') {
      lines.push('cargo run')
    } else {
      lines.push(`node ${entry}`)
    }
  }

  return codeBlock(lines.join('\n') || `# run your project here`, 'bash')
}

/**
 * Build scripts table for README.
 */
function buildScriptsSection(profile) {
  const { scripts, packageManager } = profile
  if (!scripts || Object.keys(scripts).length === 0) return null

  const pm = packageManager || 'npm'
  const run = pm === 'bun' ? 'bun run' : pm === 'pnpm' ? 'pnpm' : pm === 'yarn' ? 'yarn' : 'npm run'

  const rows = Object.entries(scripts).map(([key, val]) => [
    inlineCode(`${run} ${key}`),
    val.length > 60 ? val.slice(0, 57) + '...' : val
  ])

  const header = `| Command | Description |\n| --- | --- |`
  const body = rows.map(([cmd, desc]) => `| ${cmd} | ${desc} |`).join('\n')

  return `${h2('Scripts')}\n\n${header}\n${body}`
}

/**
 * Build contributing section.
 */
function buildContributing(profile) {
  const { packageManager, language } = profile
  const pm = packageManager || 'npm'

  let cloneBlock
  if (language === 'Rust') {
    cloneBlock = `git clone https://github.com/your-username/${profile.name}\ncd ${profile.name}\ncargo build`
  } else if (language === 'Go') {
    cloneBlock = `git clone https://github.com/your-username/${profile.name}\ncd ${profile.name}\ngo mod download`
  } else if (language === 'Python') {
    cloneBlock = `git clone https://github.com/your-username/${profile.name}\ncd ${profile.name}\npip install -e .`
  } else {
    const install = pm === 'bun' ? 'bun install' : pm === 'pnpm' ? 'pnpm install' : pm === 'yarn' ? 'yarn' : 'npm install'
    cloneBlock = `git clone https://github.com/your-username/${profile.name}\ncd ${profile.name}\n${install}`
  }

  return joinSections(
    h2('Contributing'),
    codeBlock(cloneBlock, 'bash'),
    '1. Fork the repo\n2. Create a feature branch (`git checkout -b feat/your-feature`)\n3. Commit your changes\n4. Open a pull request'
  )
}

/**
 * Generate full README.md content.
 */
function generateReadme(root, profile) {
  const { name, description, language, framework, testFramework, entryPoints } = profile

  const titleLine = h1(name)

  const descLine = description
    ? description
    : `A ${framework ? framework + ' ' : ''}${language} project.`

  const badges = [
    badge('version', '1.0.0'),
    badge('language', language, '6366F1'),
    ...(framework ? [badge('framework', framework, '8B5CF6')] : []),
    badge('license', 'MIT', '14B8A6'),
  ].join(' ')

  const installSection = joinSections(h2('Installation'), buildInstallBlock(profile))
  const usageSection = joinSections(h2('Usage'), buildUsageBlock(profile))
  const scriptsSection = buildScriptsSection(profile)

  let testSection = null
  if (testFramework) {
    const pm = profile.packageManager || 'npm'
    const run = pm === 'bun' ? 'bun run' : pm === 'pnpm' ? 'pnpm' : pm === 'yarn' ? 'yarn' : 'npm run'
    testSection = joinSections(
      h2('Testing'),
      `This project uses ${testFramework}.`,
      codeBlock(`${run} test`, 'bash')
    )
  }

  const contributing = buildContributing(profile)
  const licenseSection = joinSections(h2('License'), 'MIT')

  return joinSections(
    titleLine,
    badges,
    descLine,
    installSection,
    usageSection,
    scriptsSection,
    testSection,
    contributing,
    licenseSection
  )
}

/**
 * CLI handler for `doc-gen readme`.
 */
export async function generateReadmeCommand(options = {}) {
  const root = resolve(options.dir || process.cwd())
  printSection('Generating README')

  let profile
  try {
    profile = detectProject(root)
  } catch (err) {
    throw new Error(`Failed to analyse project: ${err.message}`)
  }

  const content = generateReadme(root, profile)
  const outPath = join(root, 'README.md')

  if (options.preview) {
    printPreview(content, Infinity)
    return
  }

  try {
    let prior
    try { prior = lstatSync(outPath) } catch (error) { if (error.code !== 'ENOENT') throw error }
    if (prior && (!prior.isFile() || prior.isSymbolicLink() || prior.nlink !== 1)) {
      throw new Error('README.md must be an unlinked regular file; refusing symlink, hardlink or non-file target')
    }
    const flags = prior
      ? constants.O_WRONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK
      : constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW
    const fd = openSync(outPath, flags, 0o666)
    try {
      const current = fstatSync(fd)
      if (!current.isFile() || current.nlink !== 1 || (prior && (current.dev !== prior.dev || current.ino !== prior.ino))) {
        throw new Error('README.md target changed or is linked; refusing to write')
      }
      ftruncateSync(fd, 0)
      writeFileSync(fd, content, 'utf-8')
    } finally { closeSync(fd) }
    printSuccess(`README.md written to ${outPath}`)
  } catch (err) {
    throw new Error(`Could not write README.md: ${err.message}`)
  }
}
