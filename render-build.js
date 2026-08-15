// render-build.js
const { execSync } = require('child_process');

console.log('🔨 Running Render-specific build...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('bun install', { stdio: 'inherit' });

  // Build only necessary packages (exclude desktop)
  console.log('🏗️ Building packages (excluding @sim/desktop)...');
  execSync('bun run build --filter=!@sim/desktop --concurrency=2', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
