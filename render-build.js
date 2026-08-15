// render-build.js
const { execSync } = require('child_process');

console.log('🔨 Running Render-specific build...');

// Force memory limit for ALL builds
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('bun install', { stdio: 'inherit' });

  // Build only necessary packages (exclude desktop)
  console.log('🏗️ Building packages (excluding @sim/desktop)...');
  execSync('bun run build --filter=!@sim/desktop --concurrency=2', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096',
      TURBO_CONCURRENCY: '2'
    }
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
