import https from "https";
import http from "http";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const opts = {
  key: fs.readFileSync(path.join(__dirname, "certs", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")),
};

const proxy = https.createServer(opts, (req, res) => {
  const proxyReq = http.request(
    { hostname: "127.0.0.1", port: 3001, path: req.url, method: req.method, headers: req.headers },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    }
  );
  proxyReq.on("error", () => { res.writeHead(502); res.end("Bad Gateway"); });
  req.pipe(proxyReq, { end: true });
});

proxy.listen(3443, "0.0.0.0", () => {
  console.log("HTTPS proxy on https://0.0.0.0:3443 → http://127.0.0.1:3001");
});
