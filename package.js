Package.describe({
  name: 'tadfmac:poormidi',
  version: '0.1.0',
  summary: 'Very Poor Web MIDI API Wrapper',
  git: 'https://github.com/tadfmac/poormidi.git',
  documentation: 'meteorpackage.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('poormidi.js');
  api.export('poormidi', 'client');
});
