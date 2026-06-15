import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const LIGHT = {
  "--bg-page":          "#f5f5f5",
  "--bg-card":          "#ffffff",
  "--bg-inset":         "#fafafa",
  "--bg-muted":         "#f3f4f6",
  "--bg-input":         "#ffffff",
  "--bg-unread":        "#f8fafc",
  "--text-primary":     "#111827",
  "--text-secondary":   "#374151",
  "--text-muted":       "#6b7280",
  "--text-placeholder": "#9ca3af",
  "--text-label":       "#374151",
  "--text-input":       "#111827",
  "--text-title":       "#111827",
  "--text-subtitle":    "#6b7280",
  "--border":           "#e5e7eb",
  "--input-border":     "#d1d5db",
};

const DARK = {
  "--bg-page":          "#111827",
  "--bg-card":          "#1f2937",
  "--bg-inset":         "#111827",
  "--bg-muted":         "#374151",
  "--bg-input":         "#111827",
  "--bg-unread":        "#1f2937",
  "--text-primary":     "#f9fafb",
  "--text-secondary":   "#e5e7eb",
  "--text-muted":       "#cbd5e1",
  "--text-placeholder": "#9ca3af",
  "--text-label":       "#e5e7eb",
  "--text-input":       "#f9fafb",
  "--text-title":       "#f9fafb",
  "--text-subtitle":    "#cbd5e1",
  "--border":           "#374151",
  "--input-border":     "#4b5563",
};

function applyTheme(dark) {
  const vars = dark ? DARK : LIGHT;
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", dark ? "dark" : "light");
}

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    applyTheme(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Apply immediately on mount (before paint)
  useEffect(() => { applyTheme(dark); }, []); // eslint-disable-line

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
