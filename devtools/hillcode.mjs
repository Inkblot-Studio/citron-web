#!/usr/bin/env node
/**
 * Hillcode · Citron Web — dev TUI + CLI for the marketing/commerce site.
 *
 * Zero npm deps. Interactive menu, or scriptable:
 *   npm run hillcode
 *   npm run hillcode -- --cmd doctor
 *   npm run hc -- --cmd dev
 */
import { spawn, spawnSync } from 'node:child_process'
import { createInterface } from 'node:readline'
import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ENV_LOCAL = join(ROOT, '.env.local')
const ENV_EXAMPLE = join(ROOT, '.env.example')
const DEV_PORT = 3000
const DEV_URL = `http://localhost:${DEV_PORT}`

const NO_COLOR =
  (process.env.NO_COLOR != null && process.env.NO_COLOR !== '') ||
  process.env.CLICOLOR === '0'

const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  citron: '\x1b[38;2;227;192;82m',
  ok: '\x1b[38;2;103;162;87m',
  err: '\x1b[38;2;209;73;64m',
  warn: '\x1b[38;2;196;146;44m',
}

function style(text, key) {
  if (NO_COLOR) return text
  const map = {
    brand: C.citron,
    muted: C.dim,
    ok: C.ok,
    err: C.err,
    warn: C.warn,
    bold: C.bold,
  }
  return (map[key] ?? '') + text + C.reset
}

/** @type {Record<string, { label: string; hint?: string; run: () => Promise<number> }>} */
const COMMANDS = {
  setup: {
    label: 'Install deps + seed .env.local',
    run: cmdSetup,
  },
  dev: {
    label: 'Start Next.js dev server',
    hint: DEV_URL,
    run: cmdDev,
  },
  build: {
    label: 'Production build',
    run: cmdBuild,
  },
  start: {
    label: 'Serve production build',
    hint: DEV_URL,
    run: cmdStart,
  },
  lint: {
    label: 'Run ESLint',
    run: cmdLint,
  },
  doctor: {
    label: 'Check Node, deps, env',
    run: cmdDoctor,
  },
  stripe: {
    label: 'Forward Stripe webhooks locally',
    hint: 'stripe listen → :3000',
    run: cmdStripe,
  },
}

const MENU = [
  ['0', 'setup'],
  ['1', 'dev'],
  ['2', 'build'],
  ['3', 'start'],
  ['4', 'lint'],
  ['5', 'doctor'],
  ['6', 'stripe'],
]

/* ── helpers ─────────────────────────────────────────────────────────────── */

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: opts.cwd ?? ROOT,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env: { ...process.env, CITRON_HILLCODE: '1', ...opts.env },
    })
    child.on('close', (code) => resolve(code ?? 1))
    child.on('error', () => resolve(1))
  })
}

function runCapture(cmd, args) {
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  })
  return { code: r.status ?? 1, out: (r.stdout || '') + (r.stderr || '') }
}

function ask(q) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(q, (a) => {
      rl.close()
      resolve(a)
    })
  })
}

function commandExists(name) {
  return runCapture(process.platform === 'win32' ? 'where' : 'which', [name]).code === 0
}

function parseEnvFile(path) {
  const out = {}
  if (!existsSync(path)) return out
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i <= 0) continue
    let v = t.slice(i + 1).trim()
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    out[t.slice(0, i).trim()] = v
  }
  return out
}

function ensureEnvLocal() {
  if (existsSync(ENV_LOCAL) || !existsSync(ENV_EXAMPLE)) return false
  copyFileSync(ENV_EXAMPLE, ENV_LOCAL)
  console.log(style('  ✓ Created .env.local from .env.example', 'ok'))
  return true
}

function nodeVersionOk() {
  const m = process.versions.node.match(/^(\d+)\./)
  if (!m) return { ok: false, detail: process.versions.node }
  const major = Number(m[1])
  return {
    ok: major >= 18,
    detail: `v${process.versions.node}${major >= 18 ? '' : ' (need 18+)'}`,
  }
}

function envStatus(key, { required = false, secret = false } = {}) {
  const env = { ...parseEnvFile(ENV_EXAMPLE), ...parseEnvFile(ENV_LOCAL) }
  const raw = (process.env[key] ?? env[key] ?? '').trim()
  const placeholder =
    !raw ||
    raw.endsWith('...') ||
    raw === 'sk_test_...' ||
    raw === 'whsec_...'
  if (!raw || placeholder) {
    return required
      ? style(secret ? 'missing' : 'unset', 'warn')
      : style('optional', 'muted')
  }
  if (secret) return style('set', 'ok')
  return style(raw.length > 48 ? `${raw.slice(0, 45)}…` : raw, 'ok')
}

/* ── commands ────────────────────────────────────────────────────────────── */

async function cmdSetup() {
  console.log(style('\n  setup · citron-web\n', 'brand'))
  if (!commandExists('npm')) {
    console.error(style('  npm not found on PATH', 'err'))
    return 1
  }
  ensureEnvLocal()
  console.log('  Installing dependencies…')
  const code = await run('npm', ['install'])
  if (code !== 0) return code
  console.log(style('\n  ✓ Setup complete. Start with menu 1 · dev\n', 'ok'))
  console.log(style(`  Open ${DEV_URL} after start.\n`, 'muted'))
  return 0
}

async function cmdDev() {
  if (!existsSync(join(ROOT, 'node_modules'))) {
    console.error(style('  node_modules missing — run setup first (menu 0)', 'err'))
    return 1
  }
  ensureEnvLocal()
  console.log(style(`\n  dev · citron-web → ${DEV_URL}\n`, 'brand'))
  console.log(style('  Ctrl+C to stop\n', 'muted'))
  return run('npm', ['run', 'dev'])
}

async function cmdBuild() {
  if (!existsSync(join(ROOT, 'node_modules'))) {
    console.error(style('  node_modules missing — run setup first (menu 0)', 'err'))
    return 1
  }
  console.log(style('\n  build · citron-web\n', 'brand'))
  return run('npm', ['run', 'build'])
}

async function cmdStart() {
  if (!existsSync(join(ROOT, '.next'))) {
    console.error(style('  .next missing — run build first (menu 2)', 'err'))
    return 1
  }
  console.log(style(`\n  start · citron-web → ${DEV_URL}\n`, 'brand'))
  console.log(style('  Ctrl+C to stop\n', 'muted'))
  return run('npm', ['run', 'start'])
}

async function cmdLint() {
  if (!existsSync(join(ROOT, 'node_modules'))) {
    console.error(style('  node_modules missing — run setup first (menu 0)', 'err'))
    return 1
  }
  return run('npm', ['run', 'lint'])
}

async function cmdStripe() {
  if (!commandExists('stripe')) {
    console.error(style('  stripe CLI not found — install from https://stripe.com/docs/stripe-cli', 'err'))
    return 1
  }
  console.log(style('\n  stripe · forwarding webhooks\n', 'brand'))
  console.log(
    style(
      `  stripe listen --forward-to localhost:${DEV_PORT}/api/webhooks/stripe\n`,
      'muted',
    ),
  )
  console.log(style('  Copy the whsec_… into .env.local as STRIPE_WEBHOOK_SECRET\n', 'muted'))
  return run('stripe', [
    'listen',
    '--forward-to',
    `localhost:${DEV_PORT}/api/webhooks/stripe`,
  ])
}

async function cmdDoctor() {
  console.log(style('\n  doctor · citron-web\n', 'brand'))
  const node = nodeVersionOk()
  const rows = [
    ['Node', node.ok ? style(node.detail, 'ok') : style(node.detail, 'err')],
    ['npm', commandExists('npm') ? style('OK', 'ok') : style('missing', 'err')],
    [
      'node_modules',
      existsSync(join(ROOT, 'node_modules'))
        ? style('present', 'ok')
        : style('missing — run setup', 'err'),
    ],
    [
      '.env.local',
      existsSync(ENV_LOCAL)
        ? style('present', 'ok')
        : style('missing — run setup', 'warn'),
    ],
    ['Stripe CLI', commandExists('stripe') ? style('available', 'ok') : style('optional', 'muted')],
    ['Dev URL', style(DEV_URL, 'brand')],
    ['', ''],
    ['IDENTITY_API_URL', envStatus('IDENTITY_API_URL')],
    ['STRIPE_SECRET_KEY', envStatus('STRIPE_SECRET_KEY', { secret: true })],
    ['STRIPE_WEBHOOK_SECRET', envStatus('STRIPE_WEBHOOK_SECRET', { secret: true })],
    ['ANTHROPIC_API_KEY', envStatus('ANTHROPIC_API_KEY', { secret: true })],
    ['CITRON_API_URL', envStatus('CITRON_API_URL')],
    ['CITRON_API_TOKEN', envStatus('CITRON_API_TOKEN', { secret: true })],
    ['DEV_FAKE_SESSION', envStatus('DEV_FAKE_SESSION')],
  ]
  for (const [k, v] of rows) {
    if (!k && !v) {
      console.log('')
      continue
    }
    console.log(`  ${k.padEnd(22)} ${v}`)
  }
  console.log('')
  return 0
}

/* ── menu / CLI ──────────────────────────────────────────────────────────── */

function needsSetup() {
  return !existsSync(join(ROOT, 'node_modules'))
}

async function runCommand(name) {
  const spec = COMMANDS[name]
  if (!spec) {
    console.error(style(`hillcode: unknown cmd: ${name}`, 'err'))
    return 1
  }
  return spec.run()
}

async function tui() {
  console.clear()
  console.log('')
  console.log(style('  hillcode', 'brand') + style(' · citron-web', 'muted'))
  console.log(style('  Inkblot Studio · marketing + commerce', 'muted'))
  console.log(style('  ──────────────────────────────────────', 'muted'))
  if (needsSetup()) {
    console.log(style('\n  Tip: run 0 · setup first (deps not installed)\n', 'brand'))
  }
  console.log('')
  for (const [num, id] of MENU) {
    const spec = COMMANDS[id]
    const hint = spec.hint ? style(`  ${spec.hint}`, 'muted') : ''
    console.log(`  ${num}  ${id.padEnd(10)} ${spec.label}${hint}`)
  }
  console.log(style('\n  q  exit\n', 'muted'))
  const choice = (await ask('  > ')).trim().toLowerCase()
  if (choice === 'q' || choice === '') return 0
  const row = MENU.find(([n]) => n === choice)
  if (!row) {
    console.log(style('  unknown choice', 'err'))
    await ask('  [Enter]')
    return tui()
  }
  const code = await runCommand(row[1])
  if (code !== 0) console.log(style(`  exited ${code}`, 'err'))
  const blocking = row[1] === 'dev' || row[1] === 'start' || row[1] === 'stripe'
  if (!blocking) {
    console.log('')
    await ask('  [Enter]')
    return tui()
  }
  return code
}

function printHelp() {
  console.log(`hillcode · citron-web

  npm run hc
  npm run hillcode
  npm run hillcode -- --cmd dev
  npm run hillcode -- --cmd setup
  npm run hillcode -- --cmd doctor

  --cmd   ${Object.keys(COMMANDS).join(' | ')}
  -h      this help
`)
}

function parseArgs(argv) {
  const out = { help: false, cmd: null }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '-h' || a === '--help') out.help = true
    else if (a === '--cmd') out.cmd = argv[++i] ?? null
    else if (a.startsWith('--cmd=')) out.cmd = a.slice(6) || null
    else if (!a.startsWith('-') && !out.cmd) out.cmd = a
  }
  return out
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return 0
  }
  if (args.cmd) return runCommand(args.cmd)
  return tui()
}

main()
  .then((code) => process.exit(typeof code === 'number' ? code : 0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
