import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [],
};

// HTTPS for local dev (self-signed)
if (process.env.NODE_ENV === "development") {
  const certDir = path.join(process.cwd(), "certs");
  if (fs.existsSync(path.join(certDir, "key.pem"))) {
    (nextConfig as any).devServer = {
      https: {
        key: path.join(certDir, "key.pem"),
        cert: path.join(certDir, "cert.pem"),
      },
    };
  }
}

export default nextConfig;
