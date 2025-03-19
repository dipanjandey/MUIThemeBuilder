import { Theme } from "@mui/material/styles";

export type ColorVariant = "main" | "light" | "dark" | "lighter" | "darker";
export type ColorType = "primary" | "secondary" | "error" | "warning" | "info" | "success";

export interface ColorSet {
  main: string;
  light: string;
  dark: string;
  lighter?: string;
  darker?: string;
}

export interface PaletteEditorProps {
  theme: Theme;
  onChange?: (newTheme: Theme) => void;
} 