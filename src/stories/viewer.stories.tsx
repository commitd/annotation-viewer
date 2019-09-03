import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AnnotationUnion } from '../types'
import Viewer from '../components/Viewer'
import { contained } from './decorators'
import { Typography } from '@material-ui/core'

const text = `The British people are represented by members of Parliament, not ruled by monarchs. However, after the English Civil War, Oliver Cromwell became Lord Protector, and the monarchy was disbanded. Though the monarchy was restored after his death, the Crown slowly became the secondary power, and Parliament the first. Members of Parliament (called MPs) were elected, but until the early twentieth century, only men who owned property could vote. In the nineteenth century, more people were given suffrage (the right to vote), but even so, by 1900, women could not vote, and only 40% of men were rich enough to vote.`

const annotations: AnnotationUnion[] = [
  {
    offset: 4,
    length: 7,
    entityType: 'NORP',
    annotationType: 'entity'
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
    offset: 145,
    length: 14,
    entityType: 'ORG',
    annotationType: 'entity'
  },
  {
    offset: 247,
    length: 5,
    entityType: 'ORG',
    annotationType: 'entity'
  },
  {
    offset: 292,
    length: 10,
    entityType: 'ORG',
    annotationType: 'entity'
  },
  {
    offset: 307,
    length: 5,
    entityType: 'ORDINAL',
    annotationType: 'entity'
  },
  {
    offset: 325,
    length: 10,
    entityType: 'ORG',
    annotationType: 'entity'
  },
  {
    offset: 373,
    length: 27,
    entityType: 'DATE',
    annotationType: 'entity'
  },
  {
    offset: 445,
    length: 22,
    entityType: 'DATE',
    annotationType: 'entity'
  },
  {
    offset: 538,
    length: 4,
    entityType: 'DATE',
    annotationType: 'entity'
  },
  {
    offset: 570,
    length: 8,
    entityType: 'PERCENT',
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
