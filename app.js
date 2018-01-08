require('babel-core/register')({
  'presets': [
    'es2017',
    ["latest-node", { "target": "current" }]
  ]
});
require('babel-polyfill');
require('./index')