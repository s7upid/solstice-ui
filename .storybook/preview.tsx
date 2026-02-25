import type { Preview } from "@storybook/react";
import React from "react";
import { DocsPage } from "@storybook/addon-docs/blocks";
import { ThemeProvider } from "../src/context/ThemeContext";
import "../src/index.css";

function ThemeWrapper({ theme, children }: { theme: string; children: React.ReactNode }) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
  const themeValue = theme === "dark" ? "dark" : "light";
  return <ThemeProvider defaultTheme={themeValue}>{children}</ThemeProvider>;
}

const preview: Preview = {
  parameters: {
    docs: {
      page: DocsPage,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f9fafb" },
        { name: "dark", value: "#111827" },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? "light";
      return (
        <ThemeWrapper theme={theme}>
          <Story />
        </ThemeWrapper>
      );
    },
  ],
};

export default preview;
