import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AnnotationUnion } from '../types'
import Viewer from '../components/Viewer'
import { contained } from './decorators'
import { Typography } from '@material-ui/core'

const text = `The British people are represented by members of Parliament, not ruled by monarchs. However, after the English Civil War, Oliver Cromwell became Lord Protector, and the monarchy was disbanded.`

const annotations: AnnotationUnion[] = [
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
  },
  {
    offset: 99,
    length: 21,
    entityType: 'EVENT',
    annotationType: 'entity'
  },
  {
    offset: 122,
    length: 15,
    entityType: 'PERSON',
    annotationType: 'entity'
  },
  {
    offset: 122,
    length: 37,
    annotationType: 'relationship-span'
  },
  {
    offset: 145,
    length: 14,
    entityType: 'ORG',
    annotationType: 'entity'
  },
  {
    offset: 165,
    length: 12,
    entityType: 'ORG',
    annotationType: 'entity'
  }
]

const props = {
  text,
  annotations,
  onAnnotationClick: action('clicked on annotation'),
  renderText: (text: string) => <span>{text}</span>
}

storiesOf('AnnotationViewer', module)
  .addDecorator(contained)
  .add('with defaults', () => <Viewer {...props} />)
  .add('with styled text', () => (
    <Viewer
      {...props}
      renderText={t => (
        // must override default component="p" to use inline component
        <Typography component="span" variant="h4">
          {t}
        </Typography>
      )}
    />
  ))
