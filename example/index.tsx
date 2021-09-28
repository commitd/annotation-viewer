import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import { AnnotationViewer } from '../dist'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createTheme()

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AnnotationViewer
          text="The British people are represented by members of Parliament"
          marks={[
            {
              offset: 4,
              length: 7,
              type: 'NORP',
            },

            {
              offset: 49,
              length: 10,
              type: 'ORG',
            },
          ]}
          inlines={[
            {
              offset: 4,
              length: 55,
              type: 'link',
            },
          ]}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))
