import React from 'react'
import { AnnotationInline } from '../components/AnnotationInline'
import { contained } from './decorators'
import { defaultInlineColors } from '../util/colorPalette'

export default {
  title: 'AnnotationInline',
  decorators: [contained]
}

const annotations = [
  {
    offset: 49,
    length: 10,
    type: 'org'
  }
]

const typeColors = {
  org: `#${defaultInlineColors[0]}`
}

export const Default = () => (
  <AnnotationInline annotations={annotations} typeColors={typeColors}>
    Parliament
  </AnnotationInline>
)

const nestedColors = {
  dfg: `#${defaultInlineColors[0]}`,
  org: `#${defaultInlineColors[1]}`,
  pol: `#${defaultInlineColors[2]}`
}

export const nested = () => (
  <AnnotationInline
    annotations={[
      {
        offset: 49,
        length: 10,
        type: 'dfg'
      }
    ]}
    typeColors={nestedColors}
  >
    <AnnotationInline
      annotations={[
        {
          offset: 49,
          length: 10,
          type: 'org'
        }
      ]}
      typeColors={nestedColors}
    >
      UK{' '}
      <AnnotationInline
        annotations={[
          {
            offset: 49,
            length: 10,
            type: 'pol'
          }
        ]}
        typeColors={nestedColors}
      >
        Parliament
      </AnnotationInline>
    </AnnotationInline>
  </AnnotationInline>
)

export const WithToolTip = () => (
  <AnnotationInline
    annotations={annotations}
    typeColors={typeColors}
    getTooltipText={_ann => 'ORG'}
  >
    Parliament
  </AnnotationInline>
)

export const nestedWithToolTip = () => (
  <>
    <AnnotationInline
      annotations={[
        {
          offset: 49,
          length: 10,
          type: 'dfg'
        },
        {
          offset: 49,
          length: 10,
          type: 'org'
        }
      ]}
      typeColors={nestedColors}
      getTooltipText={annotations => annotations.map(a => a.type).join(', ')}
    >
      UK
    </AnnotationInline>
    <AnnotationInline
      annotations={[]}
      typeColors={nestedColors}
      getTooltipText={annotations => annotations.map(a => a.type).join(', ')}
    >
      {' '}
    </AnnotationInline>
    <AnnotationInline
      annotations={[
        {
          offset: 49,
          length: 10,
          type: 'dfg'
        },
        {
          offset: 49,
          length: 10,
          type: 'org'
        },
        {
          offset: 49,
          length: 10,
          type: 'pol'
        }
      ]}
      typeColors={nestedColors}
      getTooltipText={annotations => annotations.map(a => a.type).join(', ')}
    >
      Parliament
    </AnnotationInline>
  </>
)

export const WithAction = () => (
  <AnnotationInline
    annotations={annotations}
    typeColors={typeColors}
    onClick={ann => alert(ann)}
  >
    Parliament
  </AnnotationInline>
)
