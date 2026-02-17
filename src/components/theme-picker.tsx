"use client";

import { useEffect, useState } from "react";

type ThemeName = "dark" | "white" | "sepia";
type ThemeOption = {
  name: ThemeName;
  label: string;
  swatch: string;
};

const STORAGE_KEY = "redline-theme";

const THEME_OPTIONS: ThemeOption[] = [
  { name: "dark", label: "Dark", swatch: "#121820" },
  { name: "white", label: "White", swatch: "#ffffff" },
  { name: "sepia", label: "Sepia", swatch: "#c8a97b" },
];

function isThemeName(value: string | null): value is ThemeName {
  return value === "dark" || value === "white" || value === "sepia";
}

export function ThemePicker() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>("white");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme: ThemeName = isThemeName(storedTheme)
      ? storedTheme
      : "white";

    document.documentElement.dataset.theme = initialTheme;
    setActiveTheme(initialTheme);
  }, []);

  function selectTheme(theme: ThemeName) {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
    setActiveTheme(theme);
  }

  return (
    <div className="theme-picker" role="group" aria-label="Color themes">
      {THEME_OPTIONS.map((theme) => (
        <button
          key={theme.name}
          type="button"
          className={`theme-dot ${activeTheme === theme.name ? "is-active" : ""}`}
          style={{ backgroundColor: theme.swatch }}
          aria-label={`Switch to ${theme.label} theme`}
          aria-pressed={activeTheme === theme.name}
          onClick={() => selectTheme(theme.name)}
        >
          <span className="visually-hidden">{theme.label}</span>
        </button>
      ))}
    </div>
  );
}
