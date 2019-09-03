import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AnnotationUnion } from '../types'
import Viewer from '../components/Viewer'
import { contained } from './decorators'
import randomColor from 'randomcolor'
import PersonIcon from '@material-ui/icons/Person'
import OrgIcon from '@material-ui/icons/LocationCity'
import EventIcon from '@material-ui/icons/EventNote'
import NorpIcon from '@material-ui/icons/Language'

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
  onAnnotationClick: action('clicked on annotation')
}

storiesOf('AnnotationViewer', module)
  .addDecorator(contained)
  .add('simple example', () => (
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
  ))
  .add('full example', () => <Viewer {...props} />)
  .add('entity type hidden', () => <Viewer {...props} hideEntityType={true} />)
  .add('custom colours', () => (
    <Viewer
      {...props}
      entityColors={new Array(10).map(() =>
        randomColor({ luminosity: 'light' })
      )}
      relationshipColor={randomColor({ luminosity: 'dark' })}
    />
  ))
  .add('custom colour preset', () => (
    <Viewer
      {...props}
      entityColorPresets={{
        PERSON: 'red',
        ORG: 'linear-gradient(90deg, #AA9CFC, #FC9CE7)'
      }}
    />
  ))
  .add('full example styled text', () => (
    <Viewer {...props} typographyProps={{ variant: 'h5' }} />
  ))
  .add('custom entity icons', () => (
    <Viewer
      {...props}
      renderEntityType={type => {
        switch (type) {
          case 'PERSON':
            return <PersonIcon fontSize="inherit" />
          case 'ORG':
            return <OrgIcon fontSize="inherit" />
          case 'NORP':
            return <NorpIcon fontSize="inherit" />
          case 'EVENT':
            return <EventIcon fontSize="inherit" />
          default:
            return type
        }
      }}
    />
  ))
