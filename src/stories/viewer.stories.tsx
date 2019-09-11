import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { MarkAnnotation, InlineAnnotation } from '../types'
import Viewer from '../components/Viewer'
import { contained } from './decorators'
import PersonIcon from '@material-ui/icons/Person'
import OrgIcon from '@material-ui/icons/LocationCity'
import EventIcon from '@material-ui/icons/EventNote'
import NorpIcon from '@material-ui/icons/Language'
// @ts-ignore
import palette from 'google-palette'
import { cbDark2 } from '../util/colorPalette'

const text = `The British people are represented by members of Parliament, not ruled by monarchs. However, after the English Civil War, Oliver Cromwell became Lord Protector, and the monarchy was disbanded.`

const marks: MarkAnnotation[] = [
  {
    offset: 4,
    length: 7,
    markType: 'NORP'
  },
  {
    offset: 49,
    length: 10,
    markType: 'ORG'
  },
  {
    offset: 99,
    length: 21,
    markType: 'EVENT'
  },
  {
    offset: 122,
    length: 15,
    markType: 'PERSON'
  },
  {
    offset: 145,
    length: 14,
    markType: 'ORG'
  },
  {
    offset: 165,
    length: 12,
    markType: 'ORG'
  }
]
const inlines: InlineAnnotation[] = [
  {
    offset: 4,
    length: 55,
    inlineType: 'LINK'
  },
  {
    offset: 122,
    length: 37,
    inlineType: 'LINK'
  }
]

const overlappingMarks = [
  {
    offset: 0,
    length: 2,
    markType: 'COUNTRY'
  },
  {
    offset: 0,
    length: 17,
    markType: 'ROLE'
  },
  {
    offset: 18,
    length: 13,
    markType: 'PERSON'
  },
  {
    offset: 45,
    length: 2,
    markType: 'COUNTRY'
  },
  // UK capital
  {
    offset: 45,
    length: 10,
    markType: 'PLACE'
  }
]

const defaultProps = {
  text,
  marks,
  inlines,
  onAnnotationClick: action('clicked on annotation')
}

const overlappingInlines = [
  //UK prime minister Boris Johnson
  {
    offset: 0,
    length: 31,
    inlineType: 'worksAs'
  },
  // Boris Johnson lives in the UK capital, London
  {
    offset: 18,
    length: 45,
    inlineType: 'livesIn'
  }
]

storiesOf('AnnotationViewer', module)
  .addDecorator(contained)
  .add('simple example', () => (
    <Viewer
      hideLegend={true}
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
          length: 55,
          inlineType: 'LINK'
        }
      ]}
    />
  ))
  .add('inline test', () => (
    <Viewer
      hideLegend={true}
      text="The"
      marks={[]}
      inlines={[
        {
          offset: 0,
          length: 3,
          inlineType: 'LINK'
        }
      ]}
    />
  ))
  .add('full example', () => <Viewer {...defaultProps} hideMarkType={true} />)
  .add('mark type hidden', () => (
    <Viewer {...defaultProps} hideMarkType={true} />
  ))
  .add('custom colours', () => (
    <Viewer {...defaultProps} markColors={['red', 'blue']} />
  ))
  .add('dark colours', () => (
    <Viewer {...defaultProps} markColors={cbDark2} fadeMarks={true} />
  ))
  .add('custom colour preset', () => (
    <Viewer
      {...defaultProps}
      colorPresets={{
        PERSON: 'red',
        ORG: 'linear-gradient(90deg, #AA9CFC, #FC9CE7)',
        LINK: 'pink'
      }}
    />
  ))
  .add('full example styled text', () => (
    <Viewer {...defaultProps} typographyProps={{ variant: 'h5' }} />
  ))
  .add('custom mark icons', () => (
    <Viewer
      {...defaultProps}
      typographyProps={{ variant: 'h5' }}
      renderMarkType={type => {
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
  .add('overlapping marks', () => (
    <Viewer
      {...defaultProps}
      hideMarkType={true}
      text="UK prime minister Boris Johnson lives in the UK capital, London"
      marks={overlappingMarks}
      inlines={[]}
    />
  ))
  .add('many overlapping marks', () => (
    <Viewer
      {...defaultProps}
      hideMarkType={true}
      text="This is trippy!"
      fadeMarks={true}
      marks={[
        {
          offset: 0,
          length: 15,
          markType: 'type1'
        },
        {
          offset: 5,
          length: 10,
          markType: 'type2'
        },
        {
          offset: 5,
          length: 2,
          markType: 'type3'
        },
        {
          offset: 0,
          length: 4,
          markType: 'type4'
        },
        {
          offset: 8,
          length: 7,
          markType: 'type5'
        }
      ]}
      colorPresets={{
        type1: palette('cb-Set1', 5)[0],
        type2: palette('cb-Set1', 5)[1],
        type3: palette('cb-Set1', 5)[2],
        type4: palette('cb-Set1', 5)[3],
        type5: palette('cb-Set1', 5)[4]
      }}
      inlines={[]}
    />
  ))
  .add('overlapping marks and inlines', () => (
    <Viewer
      {...defaultProps}
      text="UK prime minister Boris Johnson lives in the UK capital, London"
      marks={overlappingMarks}
      inlines={overlappingInlines}
    />
  ))
