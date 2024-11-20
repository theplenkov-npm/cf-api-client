const { withNx } = require('@nx/rollup/with-nx');
const { workspaceRoot } = require('@nx/devkit');

const packageRoot = '/packages/cf-api-client';

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: `${workspaceRoot}/dist/${packageRoot}`,
    tsConfig: './tsconfig.lib.json',
    compiler: 'swc',
    format: ['cjs', 'esm'],
    assets: [{ input: packageRoot, output: '.', glob: '*.md' }],
    external: 'all',
  },
  {
    // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
    // e.g.
    // output: { sourcemap: true },
  }
);
