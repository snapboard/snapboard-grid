#! /usr/bin/env node
/* eslint-disable no-console */

const execSync = require('child_process').execSync;

const { NODE_ENV = 'production' } = process.env;

const exec = (command, env) =>
  execSync(command, {
    stdio: 'inherit',
    env: { ...process.env, ...env }
  });

const ignored = './src/**/*.spec.js,./src/**/*.template.js';

// components es modules
console.log('\n\nBuilding ES modules...');
exec(`babel ./src --out-dir ./dist/es --ignore ${ignored}`, {
  NODE_ENV
});

// components cjs modules
console.log('\n\nBuilding CommonJS modules...');
exec(`babel ./src --out-dir ./dist --ignore ${ignored}`, {
  BABEL_ENV: 'cjs',
  NODE_ENV
});
