#!/usr/bin/env node
import { config, DotenvConfigOutput } from 'dotenv';
import handler from 'serve-handler';
import http from 'http';
// import esbuildServe from 'esbuild-serve';
import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';
import { Readable } from 'stream';
import chokidar from 'chokidar';

const conf: DotenvConfigOutput = config();
const def = {};
if (conf.parsed) {
  Object.entries(conf.parsed).forEach((it) => {
    // @ts-ignore
    def[`process.env.${it[0]}`] = JSON.stringify(it[1]);
  });
} else {
  if (!process.env.BASE_URL) {
    def['process.env.BASE_URL'] = JSON.stringify('https://api.lambda.direct/');
  } else {
    def['process.env.BASE_URL'] = JSON.stringify(process.env.BASE_URL);
  }
}
console.log(def);

esbuild.build({
  logLevel: 'error',
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  outdir: 'www',
  define: def,
  watch: true,
  loader: {
    '.png': 'file',
    '.svg': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
  },
});

fs.cpSync('./src/assets/', './www/assets/', { recursive: true });
fs.cpSync('./src/files/', './www/files/', { recursive: true });
fs.copyFileSync('./src/index.html', './www/index.html');

const htmlMimeTypes = new Set(['html', 'htm', 'shtml']);
const eventSource = '/__servie';

const injectCode = `
<script async>
(() => (new EventSource('${eventSource}').onmessage = () => location.reload()))();
</script>`;

export const injectContent = (content: any) => {
  const index = content.indexOf('</body>');
  const start = content.slice(0, index + 7);
  const end = content.slice(index + 7);

  return start + injectCode + end;
};

const clients: http.ServerResponse[] = [];
const server = http.createServer(async (request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  console.log(request.url);
  if (request.url === eventSource) {
    console.log('ping');
    const client = response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    clients.push(client);
    return;
  }

  return handler(
    request,
    response,
    {
      public: './www',
      cleanUrls: true,
      rewrites: [{ source: '**', destination: '/index.html' }],
    },
    {
      // @ts-ignore
      lstat(filePath: any) {
        console.log('file', filePath);
        const extension = path.extname(filePath).toLowerCase().slice(1);
        const isHtml = htmlMimeTypes.has(extension);
        const result = fs.lstatSync(filePath);
        if (!isHtml) return result;

        result.size = Buffer.byteLength(injectCode) + result.size;
        return result;
      },
      // @ts-ignore
      createReadStream(filePath: any, config: any) {
        const extension = path.extname(filePath).toLowerCase().slice(1);
        const isHtml = htmlMimeTypes.has(extension);

        if (!isHtml) return fs.createReadStream(filePath, config);
        const fileContent = fs.readFileSync(filePath, config).toString();
        const injected = injectContent(fileContent);
        return Readable.from(injected);
      },
    }
  );
});

const update = () => {
  clients.forEach((response) => response.write('data: update\n\n'));
  clients.length = 0;
};

chokidar.watch('www').on('all', (event, path) => {
  update();
});

server.listen(4000, () => {
  console.log('Running at http://localhost:3000');
});
