import css from '@emotion/css'
import React from 'react'
import { AnnotationMark } from './AnnotationMark'

export interface AnnotationLegendProps {
  /**
   * The list of currently selected types
   *
   * (See useAnnotation for provided version)
   */
  selectedTypes: string[]
  /**
   * Function to toggle the type on and off
   *
   * (See useAnnotation for provided version)
   */
  toggleType: (type: string) => void
  /**
   * The type colors to use.
   *
   * Should be the same as those passed to the AnnotationView
   */
  typeColors: { [index: string]: string }
  /**
   * Set true to fade the coloring of the Marks
   */
  fadeMarks?: boolean
  /** The direction to layout the types */
  layout?: 'column' | 'column-reverse' | 'row' | 'row-reverse'
  /** Optional. Customises the styling of the text. Applied to all text regardless of annotations. See https://material-ui.com/api/typography/ for a full list of options. */
  typographyProps?: Record<string, any>
}

/**
 *
 * An optional legend to be used with the AnnotationView to describe the types.
 *
 */
export const AnnotationLegend: React.FC<AnnotationLegendProps> = ({
  typeColors,
  selectedTypes,
  toggleType,
  fadeMarks,
  typographyProps,
  layout = 'row',
}) => {
  return (
    <div {...typographyProps}>
      <div
        css={css({
          margin: 8,
          display: 'flex',
          // @ts-ignore
          flexDirection: layout,
          flexWrap: 'wrap',
        })}
      >
        {Object.keys(typeColors).map((t) => {
          const onClick = () => toggleType(t)
          return (
            <div key={t} css={css({ margin: 8 })} onClick={onClick}>
              <AnnotationMark
                annotations={[{ length: t.length, offset: 0, type: t }]}
                hideType={true}
                typeColors={typeColors}
                fade={fadeMarks}
                getTooltipText={null}
                onClick={onClick}
                included={selectedTypes.includes(t)}
              >
                {t}
              </AnnotationMark>
            </div>
          )
        })}
      </div>
    </div>
  )
}
