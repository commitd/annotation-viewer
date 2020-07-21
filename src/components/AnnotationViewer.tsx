import { Flex, Card, makeStyles } from '@committed/components'
import { FlexDirectionProperty } from 'csstype'
import React from 'react'
import { AnnotationView, AnnotationViewProps } from './AnnotationView'
import { Legend } from './Legend'
import { useAnnotation } from './useAnnotations'

export type Layout = 'none' | 'top' | 'bottom' | 'left' | 'right'

interface AnnotationViewerProps extends AnnotationViewProps {
  /** Optional. Layout of legend */
  legend?: Layout
}

const useStyles = makeStyles(theme => ({
  ['legend-top']: { margin: `${theme.spacing(2)}px 0` },
  ['legend-bottom']: { margin: `${theme.spacing(2)}px 0` },
  ['legend-left']: { margin: `0 ${theme.spacing(2)}px ` },
  ['legend-right']: { margin: `0 ${theme.spacing(2)}px` }
}))

const layout = (
  legend: Layout
): {
  flexDirection: FlexDirectionProperty
  legendDirection: FlexDirectionProperty
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

export const AnnotationViewer: React.FC<AnnotationViewerProps> = ({
  marks,
  inlines,
  typeColors: typeColorOverrides,
  typographyProps,
  legend = 'top',
  ...ViewerProps
}) => {
  const classes = useStyles()
  const {
    filteredMarks,
    filteredInlines,
    selectedTypes,
    toggleType,
    typeColors
  } = useAnnotation(marks, inlines, typeColorOverrides)

  const { flexDirection, legendDirection } = layout(legend)

  return (
    <Flex flexDirection={flexDirection}>
      {legend !== 'none' && (
        // @ts-ignore
        <div className={classes[`legend-${legend}`]}>
          <Legend
            typeColors={typeColors}
            selectedTypes={selectedTypes}
            fadeMarks={ViewerProps.markProps?.fade}
            toggleType={toggleType}
            typographyProps={typographyProps}
            layout={legendDirection}
          />
        </div>
      )}
      <Card p={3}>
        <AnnotationView
          {...ViewerProps}
          marks={filteredMarks}
          inlines={filteredInlines}
          typeColors={typeColors}
          typographyProps={typographyProps}
        />
      </Card>
    </Flex>
  )
}
