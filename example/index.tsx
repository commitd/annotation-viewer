import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AnnotationViewer } from '../dist/committed-annotation-viewer.cjs.js'

const App = () => {
  return (
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
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
