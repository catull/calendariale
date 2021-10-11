const { readFileSync } = require('fs');

module.exports = () => [
  {
    matchDirectory: 'src/calendar/core',
    match: '*.ts',
    out: 'src/calendar/core/index.ts',
    template: ({ files }) => files.map((file) => `export { ${file.name} } from './${file.path}';`).join('\n') + '\n'
  },
  {
    matchDirectory: 'src/calendar',
    match: '*.ts',
    matchIgnore: ['HinduAlgorithms.ts'],
    out: 'src/calendar/index.ts',
    template: ({ files }) => files.map((file) => `export { ${file.name} } from './${file.path}';`).join('\n') + '\n'
  },
  {
    matchDirectory: 'src',
    match: '**/*.ts',
    matchIgnore: ['create-dist-package.json.ts', '**/HinduAlgorithms.ts'],
    ignoreBarrels: false,
    out: 'src/index.ts',
    template: ({ files }) =>
      files
        .map((file) => {
          let exports = `export { ${file.name} }`;

          if ('Astro' === file.name || 'Const' === file.name) {
            const content = readFileSync(`${file.absolutePath}`, 'utf8');
            // exports = content
            //   .replace(/(\r\n|\n|\r)/gm, ' ')
            //   .replace(/^.*export {(.+)}.+$/gm, '$1')
            //   .replace(/ [  ]+/, ' ');
            exports = content.replace(/^[\s\S]*(export {[\s\S]+})[\s\S]*$/gm, '$1');
          }
          return `${exports} from './${file.path}';`;
        })
        .join('\n') + '\n'
  }
];
