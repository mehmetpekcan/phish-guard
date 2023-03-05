import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

const srcDir = resolve(__dirname, "src");
const publicDir = resolve(__dirname, "public");
const outDir = resolve(__dirname, "dist");
const extensionDir = resolve(srcDir, "extension");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir,
  build: {
    outDir,
    minify: true,
    reportCompressedSize: true,
    rollupOptions: {
      input: {
        popup: resolve(extensionDir, "popup", "index.html"),
        content: resolve(extensionDir, "content", "index.js"),
        background: resolve(extensionDir, "background", "index.js"),
      },
      output: {
        entryFileNames: "src/extension/[name]/index.js",
        chunkFileNames: "assets/js/[name].[hash].js",
      },
    },
  },
});
