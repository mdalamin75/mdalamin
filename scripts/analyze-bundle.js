#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size...\n');

try {
  // Run Next.js bundle analyzer
  execSync('npx @next/bundle-analyzer', { stdio: 'inherit' });
  
  console.log('\n✅ Bundle analysis complete!');
  console.log('📊 Check the generated report for optimization opportunities');
  
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}
