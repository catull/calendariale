const version = process.argv[2];

const content = {
  name: 'calendariale',
  version,
  author: 'catull@gmail.com',
  license: 'BSD-2-Clause',
  description: 'Calendrical calculations library in TypeScript',
  keywords: [
    'calendar',
    'calendrcal calculations'
  ],
  main: 'index.js',
  type: 'module',
  types: 'index.d.ts',
  module: 'index.js',
  repository: {
    type: 'git',
    url: 'git+https://github.com/catull/calendariale.git'
  },
  bugs: {
    url: 'https://github.com/catull/calendariale/issues'
  },
  homepage: 'https://github.com/catull/calendariale',
  exports: {
    './package.json': './package.json',
    '.': {
      import: './dist/index.js'
    }
  },
};

const captains = console;

captains.log (JSON.stringify (content, undefined, '  '));

