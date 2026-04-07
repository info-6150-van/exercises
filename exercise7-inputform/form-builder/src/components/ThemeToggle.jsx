import { useThemeDispatch, useThemeRead } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme } = useThemeRead();
  const { toggleTheme } = useThemeDispatch();

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      Current Theme: {theme} (Click to Switch)
    </button>
  );
}

export default ThemeToggle;