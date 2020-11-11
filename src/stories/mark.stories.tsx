import React from 'react'
import { AnnotationMark } from '../components/AnnotationMark'
import { contained } from './decorators'
import { defaultMarkColors } from '../util/colorPalette'

export default {
  title: 'AnnotationMark',
  decorators: [contained],
}

const annotations = [
  {
    offset: 49,
    length: 10,
    type: 'org',
  },
]

const typeColors = {
  org: `#${defaultMarkColors[0]}`,
}

export const Default = () => (
  <AnnotationMark annotations={annotations} typeColors={typeColors}>
    Parliament
  </AnnotationMark>
)

export const ContrastText = () => (
  <>
    <AnnotationMark
      key={'contrast1'}
      annotations={annotations}
      typeColors={{
        org: 'blue',
      }}
      lightTextColor="#ddd"
      darkTextColor="#111"
    >
      Parliament
    </AnnotationMark>
    <AnnotationMark
      key={'contrast2'}
      annotations={annotations}
      typeColors={{
        org: 'pink',
      }}
      lightTextColor="#ddd"
      darkTextColor="#111"
    >
      Parliament
    </AnnotationMark>
  </>
)

const nestedColors = {
  dfg: `#${defaultMarkColors[0]}`,
  org: `#${defaultMarkColors[1]}`,
  pol: `#${defaultMarkColors[2]}`,
}

export const nested = () => (
  <AnnotationMark
    annotations={[
      {
        offset: 49,
        length: 10,
        type: 'dfg',
      },
    ]}
    typeColors={nestedColors}
  >
    <AnnotationMark
      annotations={[
        {
          offset: 49,
          length: 10,
          type: 'org',
        },
      ]}
      typeColors={nestedColors}
    >
      UK{' '}
      <AnnotationMark
        annotations={[
          {
            offset: 49,
            length: 10,
            type: 'pol',
          },
        ]}
        typeColors={nestedColors}
      >
        Parliament
      </AnnotationMark>
    </AnnotationMark>
  </AnnotationMark>
)

export const NotIncluded = () => (
  <AnnotationMark
    annotations={annotations}
    typeColors={typeColors}
    included={false}
    hideType={true}
  >
    ORG
  </AnnotationMark>
)

export const WithToolTip = () => (
  <AnnotationMark
    annotations={annotations}
    typeColors={typeColors}
    hideType={true}
    getTooltipText={(_ann) => 'ORG'}
  >
    Parliament
  </AnnotationMark>
)

export const WithAction = () => (
  <AnnotationMark
    annotations={annotations}
    typeColors={typeColors}
    onClick={() => alert('ORG')}
  >
    Parliament
  </AnnotationMark>
)
