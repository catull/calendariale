const version = process.argv[2];

const content = {
  name: 'calendariale',
  version,
  author: 'catull@gmail.com',
  repository: 'catull/calendariale',
  license: 'BSD-2-Clause',
  description: 'Calendrical calculations library in TypeScript',
  main: 'index.js',
  types: 'index.d.ts',
  'umd:main': 'index.umd.js',
  module: 'index.mjs',
};

const captains = console;

captains.log(JSON.stringify(content, undefined, '  '));
