import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { AngularNodeAppEngine, writeResponseToNodeResponse } from "@angular/ssr/node";

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, "../browser");

  const angularApp = new AngularNodeAppEngine();

  server.set("view engine", "html");
  server.set("views", browserDistFolder);

  // Serve static files from /browser
  server.get(
    /^\/.*/,
    express.static(browserDistFolder, {
      maxAge: "1y",
      index: "index.html",
    })
  );

  // All regular routes use the Angular engine
  server.get(/^\/.*/, (req, res, next) => {
    angularApp
      .handle(req)
      .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
      .catch(next);
  });

  return server;
}

function run(): void {
  const port = process.env["PORT"] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
