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

import Viewer from '@committed/annotation-viewer'

class Example extends React.Component {
  render() {
    return (
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
