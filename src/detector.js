import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Detect project language from files present.
 * Returns the primary language string.
 */
export function detectLanguage(root) {
  if (existsSync(join(root, 'Cargo.toml'))) return 'Rust'
  if (existsSync(join(root, 'go.mod'))) return 'Go'
  if (existsSync(join(root, 'pyproject.toml')) || existsSync(join(root, 'setup.py')) || existsSync(join(root, 'requirements.txt'))) return 'Python'
  if (existsSync(join(root, 'Gemfile'))) return 'Ruby'
  if (existsSync(join(root, 'tsconfig.json'))) return 'TypeScript'
  if (existsSync(join(root, 'package.json'))) return 'JavaScript'
  return 'Unknown'
}

/**
 * Detect framework from package.json dependencies or config files.
 */
export function detectFramework(root) {
  const pkgPath = join(root, 'package.json')
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      if (deps['next']) return 'Next.js'
      if (deps['nuxt']) return 'Nuxt'
      if (deps['@sveltejs/kit']) return 'SvelteKit'
      if (deps['svelte']) return 'Svelte'
      if (deps['express']) return 'Express'
      if (deps['fastify']) return 'Fastify'
      if (deps['hono']) return 'Hono'
      if (deps['koa']) return 'Koa'
      if (deps['react']) return 'React'
      if (deps['vue']) return 'Vue'
    } catch {
      // malformed package.json
    }
  }

  if (existsSync(join(root, 'pyproject.toml'))) {
    const content = readFileSync(join(root, 'pyproject.toml'), 'utf-8')
    if (content.includes('fastapi')) return 'FastAPI'
    if (content.includes('django')) return 'Django'
    if (content.includes('flask')) return 'Flask'
  }

  if (existsSync(join(root, 'requirements.txt'))) {
    const content = readFileSync(join(root, 'requirements.txt'), 'utf-8')
    if (content.includes('fastapi')) return 'FastAPI'
    if (content.includes('django')) return 'Django'
    if (content.includes('flask')) return 'Flask'
  }

  if (existsSync(join(root, 'go.mod'))) {
    const content = readFileSync(join(root, 'go.mod'), 'utf-8')
    if (content.includes('gin-gonic/gin')) return 'Gin'
    if (content.includes('gofiber/fiber')) return 'Fiber'
    if (content.includes('labstack/echo')) return 'Echo'
  }

  return null
}

/**
 * Detect test framework.
 */
export function detectTestFramework(root) {
  const pkgPath = join(root, 'package.json')
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      if (deps['vitest']) return 'Vitest'
      if (deps['jest']) return 'Jest'
      if (deps['mocha']) return 'Mocha'
      if (deps['ava']) return 'AVA'
      if (deps['@playwright/test']) return 'Playwright'
    } catch {
      // ignore
    }
  }

  if (existsSync(join(root, 'pyproject.toml'))) {
    const content = readFileSync(join(root, 'pyproject.toml'), 'utf-8')
    if (content.includes('pytest')) return 'pytest'
  }

  if (existsSync(join(root, 'Cargo.toml'))) return 'cargo test'

  return null
}

/**
 * Detect package manager.
 */
export function detectPackageManager(root) {
  if (existsSync(join(root, 'bun.lockb'))) return 'bun'
  if (existsSync(join(root, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(root, 'yarn.lock'))) return 'yarn'
  if (existsSync(join(root, 'package-lock.json'))) return 'npm'
  if (existsSync(join(root, 'package.json'))) return 'npm'
  if (existsSync(join(root, 'Pipfile'))) return 'pipenv'
  if (existsSync(join(root, 'pyproject.toml'))) return 'pip'
  if (existsSync(join(root, 'Cargo.toml'))) return 'cargo'
  if (existsSync(join(root, 'go.mod'))) return 'go'
  if (existsSync(join(root, 'Gemfile'))) return 'bundle'
  return null
}

/**
 * Read project name from manifest files.
 */
export function detectProjectName(root) {
  const pkgPath = join(root, 'package.json')
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      if (pkg.name) return pkg.name
    } catch {
      // ignore
    }
  }

  const cargoPath = join(root, 'Cargo.toml')
  if (existsSync(cargoPath)) {
    const content = readFileSync(cargoPath, 'utf-8')
    const match = content.match(/^name\s*=\s*"([^"]+)"/m)
    if (match) return match[1]
  }

  const pyprojectPath = join(root, 'pyproject.toml')
  if (existsSync(pyprojectPath)) {
    const content = readFileSync(pyprojectPath, 'utf-8')
    const match = content.match(/^name\s*=\s*"([^"]+)"/m)
    if (match) return match[1]
  }

  return root.split('/').pop()
}

/**
 * Read project description from manifest.
 */
export function detectDescription(root) {
  const pkgPath = join(root, 'package.json')
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      if (pkg.description) return pkg.description
    } catch {
      // ignore
    }
  }

  const pyprojectPath = join(root, 'pyproject.toml')
  if (existsSync(pyprojectPath)) {
    const content = readFileSync(pyprojectPath, 'utf-8')
    const match = content.match(/^description\s*=\s*"([^"]+)"/m)
    if (match) return match[1]
  }

  return null
}

/**
 * Find entry points for the project.
 */
export function detectEntryPoints(root) {
  const candidates = ['src/index.js', 'src/index.ts', 'index.js', 'index.ts', 'main.js', 'main.ts', 'src/main.js', 'src/main.ts', 'app.js', 'app.ts', 'src/app.js', 'src/app.ts', 'main.py', 'src/main.py', 'app.py', 'main.go', 'cmd/main.go', 'src/main.rs', 'main.rs']
  return candidates.filter(c => existsSync(join(root, c)))
}

/**
 * Read scripts from package.json.
 */
export function detectScripts(root) {
  const pkgPath = join(root, 'package.json')
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      return pkg.scripts || {}
    } catch {
      // ignore
    }
  }
  return {}
}

/**
 * Detect build tool.
 */
export function detectBuildTool(root) {
  const pkgPath = join(root, 'package.json')
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      if (deps['vite']) return 'Vite'
      if (deps['webpack']) return 'Webpack'
      if (deps['esbuild']) return 'esbuild'
      if (deps['rollup']) return 'Rollup'
      if (deps['turbopack']) return 'Turbopack'
      if (deps['tsup']) return 'tsup'
    } catch {
      // ignore
    }
  }
  if (existsSync(join(root, 'Makefile'))) return 'Make'
  return null
}

/**
 * Full project profile in one call.
 */
export function detectProject(root) {
  return {
    name: detectProjectName(root),
    description: detectDescription(root),
    language: detectLanguage(root),
    framework: detectFramework(root),
    testFramework: detectTestFramework(root),
    packageManager: detectPackageManager(root),
    buildTool: detectBuildTool(root),
    entryPoints: detectEntryPoints(root),
    scripts: detectScripts(root),
  }
}
