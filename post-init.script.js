#!/usr/bin/env node
const process = require('process')
const { rmdir } = require('fs').promises;
const { applyPlugins } = require('./template/plugins');

applyPlugins().then(async () => {
  await rmdir('./plugins', { recursive: true });
});
