import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Providers } from "@/lib/providers";
import Home from "@/pages/Home";
import Market from "@/pages/Market";
import History from "@/pages/History";
import { captureReferral } from "@/hooks/useReferral";
import { Background } from "@/components/Background";
import "./index.css";

// Capture ?ref= param before React renders
captureReferral();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Background />
      <Providers>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market/:feedId" element={<Market />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Providers>
    </HashRouter>
  </React.StrictMode>
);
