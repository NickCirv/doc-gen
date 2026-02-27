import chalk from 'chalk'

const ACCENT = '#14B8A6'

/**
 * Heading levels.
 */
export function h1(text) {
  return `# ${text}`
}

export function h2(text) {
  return `## ${text}`
}

export function h3(text) {
  return `### ${text}`
}

/**
 * Code block with optional language tag.
 */
export function codeBlock(code, lang = '') {
  return `\`\`\`${lang}\n${code}\n\`\`\``
}

/**
 * Inline code.
 */
export function inlineCode(text) {
  return `\`${text}\``
}

/**
 * Bullet list from array.
 */
export function bulletList(items) {
  return items.map(i => `- ${i}`).join('\n')
}

/**
 * Numbered list from array.
 */
export function numberedList(items) {
  return items.map((i, idx) => `${idx + 1}. ${i}`).join('\n')
}

/**
 * Horizontal rule.
 */
export function hr() {
  return '\n---\n'
}

/**
 * Badge markdown (shields.io style).
 */
export function badge(label, message, color = '14B8A6') {
  const encoded = encodeURIComponent(label)
  const msgEncoded = encodeURIComponent(message)
  return `![${label}](https://img.shields.io/badge/${encoded}-${msgEncoded}-${color})`
}

/**
 * Blockquote.
 */
export function blockquote(text) {
  return text.split('\n').map(l => `> ${l}`).join('\n')
}

/**
 * Table from array of objects.
 * @param {string[]} headers
 * @param {string[][]} rows
 */
export function table(headers, rows) {
  const headerRow = `| ${headers.join(' | ')} |`
  const separator = `| ${headers.map(() => '---').join(' | ')} |`
  const dataRows = rows.map(r => `| ${r.join(' | ')} |`)
  return [headerRow, separator, ...dataRows].join('\n')
}

/**
 * Print success message to terminal.
 */
export function printSuccess(msg) {
  console.log(chalk.hex(ACCENT)('✓') + ' ' + msg)
}

/**
 * Print error to terminal.
 */
export function printError(msg) {
  console.error(chalk.red('✗') + ' ' + msg)
}

/**
 * Print info to terminal.
 */
export function printInfo(msg) {
  console.log(chalk.dim('→') + ' ' + msg)
}

/**
 * Print a section header to terminal.
 */
export function printSection(title) {
  console.log('\n' + chalk.hex(ACCENT).bold(title))
  console.log(chalk.dim('─'.repeat(title.length)))
}

/**
 * Print a preview of markdown output with syntax highlighting hints.
 */
export function printPreview(markdown, maxLines = 20) {
  const lines = markdown.split('\n').slice(0, maxLines)
  for (const line of lines) {
    if (line.startsWith('# ')) {
      console.log(chalk.hex(ACCENT).bold(line))
    } else if (line.startsWith('## ') || line.startsWith('### ')) {
      console.log(chalk.hex(ACCENT)(line))
    } else if (line.startsWith('```')) {
      console.log(chalk.dim(line))
    } else if (line.startsWith('- ') || line.match(/^\d+\./)) {
      console.log(chalk.white(line))
    } else {
      console.log(chalk.gray(line))
    }
  }
  if (markdown.split('\n').length > maxLines) {
    console.log(chalk.dim(`  ... (${markdown.split('\n').length - maxLines} more lines)`))
  }
}

/**
 * Join markdown sections with double newlines.
 */
export function joinSections(...sections) {
  return sections.filter(Boolean).join('\n\n')
}
