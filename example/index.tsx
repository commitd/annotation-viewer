import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Viewer from '../src'

const App = () => {
  return (
    <div>
      <Viewer
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
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
