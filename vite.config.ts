import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist",
      include: ["src"],
      exclude: ["**/*.test.ts", "**/*.test.tsx"],
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SolsticeUI",
      fileName: (format) =>
        format === "es" ? "solstice-ui.js" : "solstice-ui.umd.cjs",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "lucide-react",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "lucide-react": "LucideReact",
        },
        assetFileNames: "style.[ext]",
        compact: true,
      },
    },
    sourcemap: false,
    target: "es2022",
    minify: "esbuild",
  },
});
