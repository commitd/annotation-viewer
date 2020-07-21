import { makeStyles, Typography } from '@committed/components'
import { BackgroundProperty } from 'csstype'
import React from 'react'
import { InlineAnnotation, MarkAnnotation } from '../types'
import { getEnd, isIntersecting } from '../util/spans'
import { tokenise } from '../util/tokeniser'
import { Inline } from './Inline'
import { Mark, MarkProps } from './Mark'

export interface AnnotationViewProps {
  /** A text string. */
  text: string
  /** A list of mark  annotations to render over the text. Annotations consist of offsets in `text`. */
  marks: MarkAnnotation[]
  /** A list of inline annotations to render over the text. Annotations consist of offsets in `text`. */
  inlines: InlineAnnotation[]
  /** Optional. Triggered when an annotation is clicked on. */
  onClick?: (selection: {
    text: string
    marks: MarkAnnotation[]
    inlines: InlineAnnotation[]
  }) => void
  /** Optional. Colors of the types. An object mapping an mark/inline type to a particular background colour. */
  typeColors?: { [index: string]: BackgroundProperty<string> }
  /** Optional. Customises the styling of the text. Applied to all text regardless of annotations. See https://material-ui.com/api/typography/ for a full list of options. */
  typographyProps?: React.ComponentProps<typeof Typography>
  /** Addition props provided to the marks */
  markProps?: Omit<
    MarkProps,
    'marks' | 'onClick' | 'typeColors' | 'hideLeftBorder' | 'hideRightBorder'
  >
}

const useStyles = makeStyles({
  text: {
    wordSpacing: '0.05em',
    display: 'inline-block',
    lineHeight: 3,
    whiteSpace: 'pre-wrap'
  }
})

export const AnnotationView: React.FC<AnnotationViewProps> = ({
  text,
  marks,
  inlines,
  typographyProps,
  onClick,
  typeColors,
  markProps
}) => {
  const classes = useStyles()
  const inlineSpanTokens = tokenise(text, inlines)

  return (
    <div>
      <Typography {...typographyProps} className={classes.text}>
        {inlineSpanTokens.map(rt => {
          const markTokens = tokenise(
            rt.text,
            marks
              .filter(a => isIntersecting(rt, a))
              .map(t => {
                const clippedOffset = Math.max(t.offset, rt.offset)
                const clippedEnd = Math.min(getEnd(t), getEnd(rt))
                const clippedLength = clippedEnd - clippedOffset
                return Object.assign(t, {
                  offset: clippedOffset,
                  length: clippedLength
                })
              })
              .map(o => Object.assign({}, o, { offset: o.offset - rt.offset }))
          )
          const content = (
            <>
              {markTokens.map((t, i) => {
                const previousToken = i > 0 ? markTokens[i - 1] : null
                const nextToken =
                  i < markTokens.length - 1 ? markTokens[i + 1] : null
                return (
                  <Mark
                    key={`mark-${t.offset}-${t.length}`}
                    marks={t.annotations}
                    onClick={
                      onClick == null
                        ? undefined
                        : () =>
                            onClick({
                              text: t.text,
                              marks: t.annotations,
                              inlines: rt.annotations
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
                  </Mark>
                )
              })}
            </>
          )
          return (
            <Inline
              key={`inline-${rt.offset}-${rt.length}`}
              inlines={rt.annotations}
              typeColors={typeColors}
            >
              {content}
            </Inline>
          )
        })}
      </Typography>
    </div>
  )
}
