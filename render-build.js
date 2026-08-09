import { execSync } from 'child_process'

console.log('🚀 Starting Render build with memory optimization...')

const buildCmd =
  'turbo run build --filter=!@sim/desktop --filter=!@sim/desktop-bridge --concurrency=2'

try {
  execSync(buildCmd, {
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=2048' },
  })
} catch (error) {
  console.error('❌ Build failed:', error instanceof Error ? error.message : String(error))
  process.exit(1)
}

console.log('✅ Build complete!')
