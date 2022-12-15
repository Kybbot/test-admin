import { config, DotenvConfigOutput } from 'dotenv';
import esbuild, { BuildOptions } from 'esbuild';
import fs from 'fs';

const conf: DotenvConfigOutput = config();
const def = {};
if (conf.parsed) {
  Object.entries(conf.parsed).forEach((it) => {
    // @ts-ignore
    def[`process.env.${it[0]}`] = JSON.stringify(it[1]);
  });
} else {
  if (!process.env.BASE_URL) {
    def['process.env.BASE_URL'] = JSON.stringify(
      'https://lambda-dev-be-wlui4vdhhq-no.a.run.app/'
    );
  } else {
    def['process.env.BASE_URL'] = JSON.stringify(process.env.BASE_URL);
  }
}
console.log(def);

const buildConfig: BuildOptions = {
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  loader: {
    '.png': 'file',
    '.svg': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
  },
  outdir: './dist',
  define: {
    'process.env.NODE_ENV': `"production"`,
    ...def,
  },
};

esbuild.buildSync(buildConfig);

fs.cpSync('./src/assets/', './dist/assets/', { recursive: true });
fs.cpSync('./src/files/', './dist/files/', { recursive: true });
fs.copyFileSync('./src/index.html', './dist/index.html');
