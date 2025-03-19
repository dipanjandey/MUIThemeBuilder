import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme, ThemeOptions, createTheme } from '@mui/material/styles';
import baseTheme, { theme as initialThemeConfig } from '../theme';

// Use serialization for complex theme objects
interface SerializedThemeState {
  themeConfig: string; // Serialized ThemeOptions
}

const initialState: SerializedThemeState = {
  themeConfig: JSON.stringify(initialThemeConfig),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateThemeConfig: (state, action: PayloadAction<ThemeOptions>) => {
      state.themeConfig = JSON.stringify(action.payload);
    },
    resetTheme: (state) => {
      state.themeConfig = JSON.stringify(initialThemeConfig);
    },
  },
});

// Selectors
export const selectThemeConfig = (state: { theme: SerializedThemeState }): ThemeOptions => {
  try {
    return JSON.parse(state.theme.themeConfig);
  } catch (e) {
    console.error("Failed to parse theme config:", e);
    return initialThemeConfig;
  }
};

export const selectTheme = (state: { theme: SerializedThemeState }): Theme => {
  try {
    const themeOptions = JSON.parse(state.theme.themeConfig);
    return createTheme(themeOptions);
  } catch (e) {
    console.error("Failed to create theme:", e);
    return baseTheme;
  }
};

export const { updateThemeConfig, resetTheme } = themeSlice.actions;

export default themeSlice.reducer; 