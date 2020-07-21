import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from '@committed/components'
import { AnnotationViewer } from '../dist'

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <AnnotationViewer
          text="The British people are represented by members of Parliament"
          marks={[
            {
              offset: 4,
              length: 7,
              markType: 'NORP'
            },

            {
              offset: 49,
              length: 10,
              markType: 'ORG'
            }
          ]}
          inlines={[
            {
              offset: 4,
              length: 55
            }
          ]}
        />
      </ThemeProvider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
