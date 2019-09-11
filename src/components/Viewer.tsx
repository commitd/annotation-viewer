import * as React from 'react'
import { MarkAnnotation, InlineAnnotation } from '../types'
import { tokenise } from '../util/tokeniser'
import Mark from './Mark'
import { isIntersecting, getEnd } from '../util/spans'
import Inline from './Inline'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@commitd/components'
import { BackgroundProperty } from 'csstype'
import Legend from './Legend'
import { getTypeColors } from '../util/colorGenerator'
import { useState } from 'react'
import { defaultMarkColors, defaultInlineColors } from '../util/colorPalette'

interface ViewerProps {
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
  /** Optional. Customises the styling of the text. Applied to all text regardless of annotations. See https://material-ui.com/api/typography/ for a full list of options. */
  typographyProps?: React.ComponentProps<typeof Typography>
  /** Optional. Don't show inline mark type information. */
  hideMarkType?: boolean
  /**  Optional. List of possible mark annotation. background colours. Accepts any css background value e.g. hex colour, gradient, etc. */
  markColors?: BackgroundProperty<string>[]
  /**  Optional. List of possible mark annotation. background colours. Accepts any css background value e.g. hex colour, gradient, etc. */
  inlineColors?: BackgroundProperty<string>[]
  /** Optional. An object mapping an mark/inline type to a particular background colour. Will otherwise choose a colour from `markColours` automatically. */
  colorPresets?: { [index: string]: string }
  /** Optional. Customises how inline mark types are rendered. */
  renderMarkType?: (markType: string) => React.ReactNode
  /** Optional. Whether to fade colour behind text for better readability. Default false  */
  fadeMarks?: boolean
  /** Optional. Do not show the legend. */
  hideLegend?: boolean
}

const useStyles = makeStyles(theme => ({
  text: {
    wordSpacing: '0.05em',
    display: 'inline-block',
    lineHeight: 3,
    whiteSpace: 'pre-wrap'
  },
  legend: { marginBottom: theme.spacing(5) }
}))

const Viewer: React.FC<ViewerProps> = ({
  text,
  marks,
  inlines,
  typographyProps,
  onClick,
  hideMarkType,
  markColors = defaultMarkColors,
  inlineColors = defaultInlineColors,
  colorPresets,
  renderMarkType,
  fadeMarks,
  hideLegend
}) => {
  const classes = useStyles()
  const markTypes = Array.from(new Set(marks.map(m => m.markType)))
  const inlineTypes = Array.from(new Set(inlines.map(i => i.inlineType)))
  const markTypeColors = getTypeColors(markTypes, markColors, {
    colorPresets,
    opacity: 0.7
  })
  const inlineTypeColors = getTypeColors(inlineTypes, inlineColors, {
    colorPresets
  })

  const [selectedTypes, setSelectedTypes] = useState(
    markTypes.concat(inlineTypes)
  )

  const filteredMarks = marks.filter(m => selectedTypes.includes(m.markType))
  const filteredInlines = inlines.filter(i =>
    selectedTypes.includes(i.inlineType)
  )
  const inlineSpanTokens = tokenise(text, filteredInlines)

  return (
    <div>
      {!hideLegend && (
        <div className={classes.legend}>
          <Legend
            markTypeColors={markTypeColors}
            inlineTypeColors={inlineTypeColors}
            selectedTypes={selectedTypes}
            fadeMarks={fadeMarks}
            onSelectionChange={setSelectedTypes}
          />
        </div>
      )}
      <div>
        <Typography
          {...typographyProps}
          display="inline"
          className={classes.text}
        >
          {inlineSpanTokens.map(rt => {
            const markTokens = tokenise(
              rt.text,
              filteredMarks
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
                .map(o =>
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
                    <Mark
                      key={`mark-${t.offset}-${t.length}`}
                      marks={t.annotations}
                      hideMarkType={hideMarkType}
                      fade={fadeMarks}
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
                      markTypeColors={markTypeColors}
                      renderMarkType={renderMarkType}
                      hideLeftBorder={
                        previousToken != null &&
                        previousToken.annotations.length > 0
                      }
                      hideRightBorder={
                        nextToken != null && nextToken.annotations.length > 0
                      }
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
                inlineTypeColors={inlineTypeColors}
              >
                {content}
              </Inline>
            )
          })}
        </Typography>
      </div>
    </div>
  )
}

export default Viewer
