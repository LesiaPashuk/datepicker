import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  plugins: [
    alias({
      entries: [
        { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
        { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
        { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
        { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
      ],
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.stories.tsx',
        '**/__tests__/**',
        '**/testHelper.tsx',
      ],
    }),
    postcss({
      extract: false,
      inject: true,
      modules: false,
      use: {
        sass: {
          data: `
            @use "sass:map";
            @use "${path.resolve(__dirname, 'src/app/styles/variables')}" as *;
            @use "${path.resolve(__dirname, 'src/app/styles/extends')}" as *;
            @use "${path.resolve(__dirname, 'src/app/styles/themes')}" as *;
          `,
        },
      },
      minimize: true,
    }),
  ],
};
