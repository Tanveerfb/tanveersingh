import { createContext } from "react";

export interface ThemeContextValue {
  theme: string;
  setTheme: (value: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "default",
  setTheme: () => {},
});
