import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine({
    allowedHosts: [
      'localhost',
      'fb-tools-dev.web.app',
      'fb-tools-dev.firebaseapp.com',
      '.web.app',
      '.firebaseapp.com',
      '.a.run.app',
      'fh-43b304386a53a8d6---ssrfbtoolsdev-c5cutk4rvq-uc.a.run.app',
      'fh-f5e5a23b992b970d---ssrfbtoolsdev-c5cutk4rvq-uc.a.run.app',
      'fh-91bb5a2299f24719---ssrfbtoolsdev-c5cutk4rvq-uc.a.run.app',
      'fh-7fbf67e213154a5e---ssrfbtoolsdev-c5cutk4rvq-uc.a.run.app',
      'fh-b630c6bb8b4d4d31---ssrfbtoolsdev-c5cutk4rvq-uc.a.run.app',
      'fh-9a8626668f5c407a---ssrfbtoolsdev-c5cutk4rvq-uc.a.run.app',
      'fh-51ee4b9cd0234117---ssrfbtoolsdev-c5cutk4rvq-uc.a.run.app',
      'fh-1a4964319eef4b76---ssrfbtoolsdev-c5cutk4rvq-uc.a.run.app'
    ]
  });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get(/^\/.*/, express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get(/^\/.*/, (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => {
        next(err);
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
