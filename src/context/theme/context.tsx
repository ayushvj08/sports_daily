import React, { createContext, useState } from "react";
interface ThemeContextProps {
  theme: string;
  switchTheme: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  switchTheme: () => {},
});

export const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const preferredTheme = localStorage.getItem("theme");
  const [theme, switchTheme] = useState(
    preferredTheme ? preferredTheme : "light"
  );
  const valueToShare = { theme, switchTheme };

  return (
    <ThemeContext.Provider value={valueToShare}>
      {children}
    </ThemeContext.Provider>
  );
};
