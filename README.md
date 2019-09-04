# @committed/annotation-viewer

> Annotation Viewer

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

## Development

The main build is currently performed using Rollup and `yarn build`.

We use storybook to develop and document the components, this is run in development using

```bash
yarn storybook
```

and to create a production version

```bash
yarn build-storybook
```

## Example

To run the example:

```
yarn
yarn build
cd example
yarn
yarn start
```

## License

© [Committed Software](https://github.com/commitd)