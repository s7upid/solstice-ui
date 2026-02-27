import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (viteConfig) => {
    // Set STORYBOOK_BASE_PATH=/solstice-ui/ when building for GitHub Pages so assets load (e.g. in iframe).
    const base = process.env.STORYBOOK_BASE_PATH ?? "/";
    return mergeConfig(viteConfig, { base });
  },
};

export default config;
