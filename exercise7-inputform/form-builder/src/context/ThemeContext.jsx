import { createContext, useContext, useMemo, useState } from "react";

const ThemeReadContext = createContext(null);
const ThemeDispatchContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const readValue = useMemo(() => ({ theme }), [theme]);
  const dispatchValue = useMemo(
    () => ({
      toggleTheme: () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <ThemeReadContext.Provider value={readValue}>
      <ThemeDispatchContext.Provider value={dispatchValue}>
        <div className={`app-theme ${theme}`}>{children}</div>
      </ThemeDispatchContext.Provider>
    </ThemeReadContext.Provider>
  );
}

export function useThemeRead() {
  const context = useContext(ThemeReadContext);
  if (!context) {
    throw new Error("useThemeRead must be used inside ThemeProvider");
  }
  return context;
}

export function useThemeDispatch() {
  const context = useContext(ThemeDispatchContext);
  if (!context) {
    throw new Error("useThemeDispatch must be used inside ThemeProvider");
  }
  return context;
}