import { Icons } from '@committed/components'
import React from 'react'
import { AnnotationViewer } from '../components/AnnotationViewer'
import { contained } from './decorators'
import { defaultProps, overlappingInlines, overlappingMarks } from './examples'

export default {
  title: 'AnnotationViewer',
  decorators: [contained],
}

export const Default = () => (
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
        type: 'LINK',
      },
    ]}
  />
)

export const Top = () => (
  <AnnotationViewer key="top" {...defaultProps} legend={'top'} />
)
export const Left = () => (
  <AnnotationViewer key="left" {...defaultProps} legend={'left'} />
)
export const Right = () => (
  <AnnotationViewer key="right" {...defaultProps} legend={'right'} />
)
export const Bottom = () => (
  <AnnotationViewer key="bottom" {...defaultProps} legend={'bottom'} />
)

export const CustomMarkIcons = () => (
  <AnnotationViewer
    {...defaultProps}
    typographyProps={{ variant: 'h5' }}
    markProps={{
      renderType: (type) => {
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
      },
    }}
  />
)

export const OverlappingMarksAndInlines = () => (
  <AnnotationViewer
    {...defaultProps}
    text="UK prime minister Boris Johnson lives in the UK capital, London"
    marks={overlappingMarks}
    inlines={overlappingInlines}
  />
)
