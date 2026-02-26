import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(async ({ command }) => {
  const plugins = [react()];
  if (command === "build") {
    const { default: dts } = await import("vite-plugin-dts");
    plugins.push(
      dts({
        outDir: "dist",
        include: ["src"],
        exclude: ["**/*.test.ts", "**/*.test.tsx"],
      })
    );
  }
  return {
    plugins,
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
  };
});
