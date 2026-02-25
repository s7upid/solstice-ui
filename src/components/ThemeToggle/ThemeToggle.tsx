import React from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeContextOptional } from "../../context/ThemeContext";
import { cn } from "../../utils/cn";
import styles from "./ThemeToggle.module.css";
import type { Theme } from "../../context/ThemeContext";

export interface ThemeToggleProps {
  theme?: Theme;
  onToggle?: () => void;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme: themeProp,
  onToggle: onToggleProp,
  threeD = false,
  className,
}) => {
  const ctx = useThemeContextOptional();
  const theme = themeProp ?? ctx?.theme ?? "light";
  const toggleTheme = onToggleProp ?? ctx?.toggleTheme ?? (() => {});

  const tooltip =
    theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(styles.toggle, threeD && "solstice-ui-3d", className)}
      title={tooltip}
      aria-label={tooltip}
    >
      {theme === "light" ? (
        <Sun className={styles.icon} />
      ) : (
        <Moon className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeToggle;
