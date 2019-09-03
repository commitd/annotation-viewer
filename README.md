# @committed/annotation-viewer

> Annotation Viewer


![](images/example.png)

## Install

```bash
yarn add @committed/annotation-viewer
```

## Usage

```tsx
import * as React from 'react'

import MyComponent from '@committed/annotation-viewer'

class Example extends React.Component {
  render () {
    return (
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
    )
  }
}
```
