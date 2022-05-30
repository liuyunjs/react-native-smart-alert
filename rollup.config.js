import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const es = {
  input: './library/main.tsx',
  output: {
    file: pkg.main,
    format: 'es',
    exports: 'named',
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        include: ['./library'],
        compilerOptions: {
          outDir: './dist',
        },
      },
    }),
  ],
};

export default [es];
