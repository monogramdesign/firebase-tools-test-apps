import express from "express";

export function app() {
  const server = express();

  server.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express on Firebase Hosting!" });
  });

  return server;
}


app().listen(8080, () => {
  console.log("Server is running on port 8080");
});