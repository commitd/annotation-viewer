import { Icons } from '@committed/components'
// @ts-ignore
import palette from 'google-palette'
import React from 'react'
import { AnnotationView } from '../components/AnnotationView'
import { createAnnotationColors } from '../util/colorGenerator'
import { cbDark2, defaultInlineColors } from '../util/colorPalette'
import { contained } from './decorators'
import {
  defaultProps,
  inlines,
  marks,
  overlappingInlines,
  overlappingMarks
} from './examples'

export default {
  title: 'AnnotationView',
  decorators: [contained]
}

export const Default = () => (
  <AnnotationView
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
)

export const InlineTest = () => (
  <AnnotationView
    text="The"
    marks={[]}
    inlines={[
      {
        offset: 0,
        length: 3,
        inlineType: 'LINK'
      }
    ]}
    typeColors={{
      LINK: `#${defaultInlineColors[0]}`
    }}
  />
)

export const CustomColours = () => (
  <AnnotationView
    {...defaultProps}
    typeColors={Object.assign(
      createAnnotationColors(defaultProps.marks, defaultProps.inlines),
      {
        NORP: 'red',
        ORG: 'blue',
        LINK: 'green'
      }
    )}
  />
)

export const DarkColours = () => (
  <AnnotationView
    {...defaultProps}
    typeColors={createAnnotationColors(marks, inlines, cbDark2)}
    markProps={{ fade: true }}
  />
)

export const CustomColourPreset = () => (
  <AnnotationView
    {...defaultProps}
    typeColors={Object.assign(
      createAnnotationColors(defaultProps.marks, defaultProps.inlines),
      {
        PERSON: 'red',
        ORG: 'linear-gradient(90deg, #AA9CFC, #FC9CE7)',
        LINK: 'pink'
      }
    )}
  />
)

export const StyledText = () => (
  <AnnotationView {...defaultProps} typographyProps={{ variant: 'h2' }} />
)

export const ContrastText = () => (
  <AnnotationView
    {...defaultProps}
    typeColors={Object.assign(
      createAnnotationColors(defaultProps.marks, defaultProps.inlines),
      {
        NORP: 'red',
        ORG: 'blue',
        LINK: 'green'
      }
    )}
    markProps={{ lightTextColor: '#fff', darkTextColor: '#000' }}
  />
)

export const CustomMarkIcons = () => (
  <AnnotationView
    {...defaultProps}
    markProps={{
      renderType: (type: string) => {
        switch (type) {
          case 'PERSON':
            return <Icons.Person fontSize="inherit" />
          case 'ORG':
            return <Icons.LocationCity fontSize="inherit" />
          case 'NORP':
            return <Icons.Language fontSize="inherit" />
          case 'EVENT':
            return <Icons.EventNote fontSize="inherit" />
          default:
            return type
        }
      }
    }}
  />
)

export const OverlappingMarks = () => (
  <AnnotationView
    text="UK prime minister Boris Johnson lives in the UK capital, London"
    marks={overlappingMarks}
    inlines={[]}
    markProps={{ hideType: true }}
  />
)

export const ManyOverlappingMarks = () => (
  <AnnotationView
    {...defaultProps}
    text="This is trippy!"
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
    typeColors={{
      type1: `#${palette('cb-Set1', 5)[0]}`,
      type2: `#${palette('cb-Set1', 5)[1]}`,
      type3: `#${palette('cb-Set1', 5)[2]}`,
      type4: `#${palette('cb-Set1', 5)[3]}`,
      type5: `#${palette('cb-Set1', 5)[4]}`
    }}
    inlines={[]}
    markProps={{
      hideType: true,
      fade: true
    }}
  />
)

export const OverlappingMarksAndInlines = () => (
  <AnnotationView
    {...defaultProps}
    text="UK prime minister Boris Johnson lives in the UK capital, London"
    marks={overlappingMarks}
    inlines={overlappingInlines}
  />
)