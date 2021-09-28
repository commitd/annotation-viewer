import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { ThemeProvider, Theme, StyledEngineProvider } from '@committed/components';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


/**
 * Wrap a component with the default ThemeProvider
 *
 * @param {*} Story storybook component to wrap
 */
export const withTheme = (Story) => {
  const choice = useDarkMode() ? 'dark' : 'light'
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider choice={choice}>
        <Story />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
