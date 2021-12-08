# @committed/annotation-viewer

> Annotation Viewer

[![Committed Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fcommitted.io%2Fbadge)](https://committed.io)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://committed.software/annotation-viewer)
![](images/example.png)

## Install

```bash
yarn add @committed/annotation-viewer
```

## Usage

```tsx
import React from 'react'
import { AnnotationViewer } from '@committed/annotation-viewer'

class Example extends React.Component {
  render() {
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
            type: 'Link',
          },
        ]}
      />
    )
  }
}
```

> NB The committed component `ThemeProvider` must be in the react component stack. (Future versions may remove these pees dependencies.)

Further examples of use and configuration options can be seen in the [storybook](https://committed.software/annotation-viewer).

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

```bash
yarn
yarn build
cd example
yarn
yarn start
```

## License

[MIT](/LICENSE) - © Committed Software 2021 https://committed.io
