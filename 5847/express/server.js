import express from "express";

// ESM module (#5847) exporting an `app` factory (#5832).
export function app() {
  const server = express();
  server.get("/ssr", (req, res) => {
    res.json({ ssr: true, message: "SSR OK", node: process.version });
  });
  server.get("*", (req, res) => {
    res.status(200).send("<h1>Express SSR fallback OK</h1>");
  });
  return server;
}
