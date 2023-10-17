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
  const [theme, switchTheme] = useState("light");
  const valueToShare = { theme, switchTheme };

  return (
    <ThemeContext.Provider value={valueToShare}>
      {children}
    </ThemeContext.Provider>
  );
};
