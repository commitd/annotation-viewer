import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { AnnotationViewer } from '../dist'

const theme = createMuiTheme()

const App = () => {
  return (
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
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
