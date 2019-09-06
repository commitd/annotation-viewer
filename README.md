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

### Viewer Component

| Prop               | Type                                      | Description                                                                                                                                                          |
| ------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text               | `string`                                  | A text string.                                                                                                                                                       |
| annotations        | `AnnotationUnion[]`                       | A list of entity / relationship annotations to render over the text. Annotations consist of offsets in `text`.                                                       |
| onAnnotationClick  | `(annotation: AnnotationUnion) => void`   | Optional. Triggered when an annotation is clicked on.                                                                                                                |
| typographyProps    | `TypographyProps`                         | Optional. Customises the styling of the text. Applied to all text regardless of annotations. See https://material-ui.com/api/typography/ for a full list of options. |
| hideEntityType     | `boolean`                                 | Optional. Don't show inline entity type information.                                                                                                                 |
| entityColors       | `BackgroundProperty<string>[]`            | Optional. List of possible entity annotation. background colours. Accepts any css background value e.g. hex colour, gradient, etc.                                   |
| entityColorPresets | `{ [index: string]: string }`             | Optional. An object mapping an entity type to a particular background colour. Will otherwise choose a colour from `entityColours` automatically.                     |
| relationshipColor  | `string`                                  | Optional. Colour of relationship annotations.                                                                                                                        |
| renderEntityType   | `(entityType: string) => React.ReactNode` | Optional. Customises how inline entity types are rendered.                                                                                                           |

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
