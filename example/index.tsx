import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Viewer from '../src'

const App = () => {
  return (
    <div>
      <Viewer
        text="The British people are represented by members of Parliament"
        annotations={[
          {
            offset: 4,
            length: 7,
            entityType: 'NORP',
            annotationType: 'entity'
          },
          {
            offset: 4,
            length: 55,
            annotationType: 'relationship-span'
          },
          {
            offset: 49,
            length: 10,
            entityType: 'ORG',
            annotationType: 'entity'
          }
        ]}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
