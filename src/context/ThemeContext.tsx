"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const initialTheme = savedTheme ?? systemTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  if (theme === undefined) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
    );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
