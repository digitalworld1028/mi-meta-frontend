import React, { createContext, useState, useEffect } from 'react';
// import { initialState, StateProps } from '../state'

interface IThemeContext {
  theme: string;
  setTheme?: (prev: string) => void;
}
const ThemeContext = createContext<IThemeContext>({
  theme: 'dark',
  // setTheme: Dispatch
});

// eslint-disable-next-line @typescript-eslint/ban-types
const CustomThemeProvider = ({ children }: { children: React.ReactNode; value?: {} }) => {
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { CustomThemeProvider, ThemeContext };
