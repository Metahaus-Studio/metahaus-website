import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function sendFile(response, filePath, status = 200) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Unable to read the requested file.");
      return;
    }

    response.writeHead(status, {
      "Cache-Control": "no-cache",
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Invalid request.");
    return;
  }

  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const requestedPath = path.resolve(root, relativePath);
  const isInsideRoot = requestedPath === root || requestedPath.startsWith(`${root}${path.sep}`);

  if (!isInsideRoot) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden.");
    return;
  }

  fs.stat(requestedPath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(response, requestedPath);
      return;
    }

    if (!error && stats.isDirectory()) {
      const indexPath = path.join(requestedPath, "index.html");
      fs.stat(indexPath, (indexError, indexStats) => {
        if (!indexError && indexStats.isFile()) {
          sendFile(response, indexPath);
          return;
        }

        sendFile(response, path.join(root, "404.html"), 404);
      });
      return;
    }

    sendFile(response, path.join(root, "404.html"), 404);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`MetaHaus preview: http://127.0.0.1:${port}`);
  console.log("Press Ctrl+C to stop.");
});
