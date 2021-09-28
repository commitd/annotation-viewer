import { Box, makeStyles, TypographyProps } from '@material-ui/core'
import React from 'react'
import { Annotation } from '../types'
import { getEnd, isIntersecting } from '../util/spans'
import { tokenise } from '../util/tokeniser'
import { AnnotationInline, AnnotationInlineConfig } from './AnnotationInline'
import { AnnotationMark, AnnotationMarkConfig } from './AnnotationMark'

export interface AnnotationViewProps {
  /** A text string. */
  text: string
  /** A list of annotations to render over the text using Marks. Annotations consist of offsets in `text`. */
  marks?: Annotation[]
  /** A list of annotations to render over the text using Inlines. Annotations consist of offsets in `text`. */
  inlines?: Annotation[]
  /** Optional. Triggered when an annotation is clicked on. */
  onClick?: (selection: {
    text: string
    marks: Annotation[]
    inlines: Annotation[]
  }) => void
  /** Optional. Colors of the types. An object mapping an mark/inline type to a particular background colour. */
  typeColors?: { [index: string]: string }
  /** Optional. Customises the styling of the text. Applied to all text regardless of annotations. See https://material-ui.com/api/Span/ for a full list of options. */
  typographyProps?: TypographyProps
  /** Addition props provided to configure the marks */
  markProps?: AnnotationMarkConfig
  /** Addition props provided to the marks */
  inlineProps?: AnnotationInlineConfig
}

const useStyles = makeStyles({
  text: {
    wordSpacing: '0.05em',
    display: 'inline-block',
    lineHeight: 3,
    whiteSpace: 'pre-wrap',
  },
})

/**
 * The AnnotationView renders the given text with the given mark and inline annotations.
 *
 * It can be used separately or with the AnnotationLegend. This is done for you in `AnnotationViewer` but can be done separately using `useAnnotation` if you want a different layout.
 */
export const AnnotationView: React.FC<AnnotationViewProps> = ({
  text,
  marks = [],
  inlines = [],
  typographyProps,
  onClick,
  typeColors,
  markProps,
  inlineProps,
}) => {
  const classes = useStyles()
  const inlineSpanTokens = tokenise(text, inlines)

  return (
    <div>
      <Box display="inline" {...typographyProps} className={classes.text}>
        {inlineSpanTokens.map((rt) => {
          const markTokens = tokenise(
            rt.text,
            marks
              .filter((a) => isIntersecting(rt, a))
              .map((t) => {
                const clippedOffset = Math.max(t.offset, rt.offset)
                const clippedEnd = Math.min(getEnd(t), getEnd(rt))
                const clippedLength = clippedEnd - clippedOffset
                return Object.assign(t, {
                  offset: clippedOffset,
                  length: clippedLength,
                })
              })
              .map((o) =>
                Object.assign({}, o, { offset: o.offset - rt.offset })
              )
          )
          const content = (
            <>
              {markTokens.map((t, i) => {
                const previousToken = i > 0 ? markTokens[i - 1] : null
                const nextToken =
                  i < markTokens.length - 1 ? markTokens[i + 1] : null
                return (
                  <AnnotationMark
                    key={`mark-${t.offset}-${t.length}`}
                    annotations={t.annotations}
                    onClick={
                      onClick == null
                        ? undefined
                        : (annotations) =>
                            onClick({
                              text: t.text,
                              marks: annotations,
                              inlines: rt.annotations,
                            })
                    }
                    typeColors={typeColors}
                    hideLeftBorder={
                      previousToken != null &&
                      previousToken.annotations.length > 0
                    }
                    hideRightBorder={
                      nextToken != null && nextToken.annotations.length > 0
                    }
                    {...markProps}
                  >
                    {t.text}
                  </AnnotationMark>
                )
              })}
            </>
          )
          return (
            <AnnotationInline
              key={`inline-${rt.offset}-${rt.length}`}
              annotations={rt.annotations}
              typeColors={typeColors}
              onClick={
                onClick == null
                  ? undefined
                  : (annotations) =>
                      onClick({
                        text: rt.text,
                        marks: [],
                        inlines: annotations,
                      })
              }
              {...inlineProps}
            >
              {content}
            </AnnotationInline>
          )
        })}
      </Box>
    </div>
  )
}
