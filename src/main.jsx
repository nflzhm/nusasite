import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NusaSite from "./pages/NusaSite";
import TentangKami from "./pages/TentangKami";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NusaSite />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);