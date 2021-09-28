import React from 'react'
import { AnnotationView, AnnotationViewProps } from './AnnotationView'
import { AnnotationLegend } from './AnnotationLegend'
import { useAnnotation } from './useAnnotations'

export type Layout = 'none' | 'top' | 'bottom' | 'left' | 'right'

interface AnnotationViewerProps extends AnnotationViewProps {
  /** Optional. Layout of legend */
  legend?: Layout
}

const legendStyles = {
  ['top']: { margin: `16 0` },
  ['bottom']: { margin: `16 0` },
  ['left']: { margin: `0 16 ` },
  ['right']: { margin: `0 16` },
}

const layout = (
  legend: Layout
): {
  flexDirection: 'column' | 'column-reverse' | 'row' | 'row-reverse'
  legendDirection: 'column' | 'column-reverse' | 'row' | 'row-reverse'
} => {
  switch (legend) {
    case 'bottom':
      return { flexDirection: 'column-reverse', legendDirection: 'row' }
    case 'top':
      return { flexDirection: 'column', legendDirection: 'row' }
    case 'right':
      return { flexDirection: 'row-reverse', legendDirection: 'column' }
    default:
      return { flexDirection: 'row', legendDirection: 'column' }
  }
}

/**
 * The AnnotationViewer renders the given text with the given mark and inline annotations and provider a legend for the types that can toggle the annotations on and off.
 *
 * The layout can be configured using the `layout` props.
 * The parts `AnnotationView`, `AnnotationLegend` and `useAnnotation` can be used separately if you want a different layout using this code as a guide.
 */
export const AnnotationViewer: React.FC<AnnotationViewerProps> = ({
  marks = [],
  inlines = [],
  typeColors: typeColorOverrides,
  typographyProps,
  legend = 'top',
  ...ViewerProps
}) => {
  const {
    filteredMarks,
    filteredInlines,
    selectedTypes,
    toggleType,
    typeColors,
  } = useAnnotation(marks, inlines, typeColorOverrides)

  const { flexDirection, legendDirection } = layout(legend)

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: flexDirection,
      }}
    >
      {legend !== 'none' && (
        <div css={legendStyles[legend]}>
          <AnnotationLegend
            typeColors={typeColors}
            selectedTypes={selectedTypes}
            fadeMarks={ViewerProps.markProps?.fade}
            toggleType={toggleType}
            layout={legendDirection}
          />
        </div>
      )}
      <div css={{ padding: 24 }}>
        <div css={{ padding: 24, backgroundColor: '#fff' }}>
          <AnnotationView
            {...ViewerProps}
            marks={filteredMarks}
            inlines={filteredInlines}
            typeColors={typeColors}
            typographyProps={typographyProps}
          />
        </div>
      </div>
    </div>
  )
}
