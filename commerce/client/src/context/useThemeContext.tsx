import * as React from "react";
import "../index.css";
import darkIcon from "../assets/dark.gif";
import lightIcon from "../assets/light.gif";

interface IThemeProviderProps {
  children: React.ReactNode;
}

type Theme = "dark" | "light";


interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState<Theme>("light");

  const icon = {
    lightIcon,
    darkIcon,
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  React.useEffect(() => {
    document.body.setAttribute("data-theme", theme); // e.g., data-theme="dark"
  }, [theme]);

  const value = {
    icon,
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
