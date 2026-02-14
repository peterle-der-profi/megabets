import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MegaBets — 60-Second Micro-Predictions",
  description: "Bet UP or DOWN on BTC & ETH. 60-second rounds. Instant payouts. Powered by MegaETH.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
