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
      try {
        // Get the current theme config from state
        const currentThemeConfig = JSON.parse(state.themeConfig);
        
        // Create a new object with only the properties that are in initialThemeConfig
        const filteredThemeConfig: ThemeOptions = {};
        
        // Handle spacing separately since it might not be in initialThemeConfig
        if (action.payload.spacing !== undefined) {
          filteredThemeConfig.spacing = Number(action.payload.spacing);
        } else if (currentThemeConfig.spacing !== undefined) {
          filteredThemeConfig.spacing = Number(currentThemeConfig.spacing);
        }
        
        // Copy only properties that exist in initialThemeConfig
        Object.keys(initialThemeConfig).forEach((key) => {
          const typedKey = key as keyof typeof initialThemeConfig;
          
          if (action.payload[typedKey] !== undefined) {
            (filteredThemeConfig as Record<keyof typeof initialThemeConfig, unknown>)[typedKey] = action.payload[typedKey];
          } else if (currentThemeConfig[typedKey] !== undefined) {
            (filteredThemeConfig as Record<keyof typeof initialThemeConfig, unknown>)[typedKey] = currentThemeConfig[typedKey];
          }
        });
        
        // Special handling for palette to ensure we keep custom color properties
        if (action.payload.palette) {
          filteredThemeConfig.palette = {} as Partial<typeof initialThemeConfig.palette>;
          
          // For each color type in initialThemeConfig.palette
          Object.keys(initialThemeConfig.palette || {}).forEach((colorType) => {
            const typedColorType = colorType as keyof typeof initialThemeConfig.palette;
            
            if (action.payload.palette && action.payload.palette[typedColorType]) {
              filteredThemeConfig.palette![typedColorType] = action.payload.palette[typedColorType];
            } else if (currentThemeConfig.palette && currentThemeConfig.palette[typedColorType]) {
              filteredThemeConfig.palette![typedColorType] = currentThemeConfig.palette[typedColorType];
            }
          });
        }
        
        // Update state with the filtered theme config
        state.themeConfig = JSON.stringify(filteredThemeConfig);
      } catch (e) {
        console.error("Failed to update theme config:", e);
        // Fallback to simply updating with the payload
        state.themeConfig = JSON.stringify(action.payload);
      }
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