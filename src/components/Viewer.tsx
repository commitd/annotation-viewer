import * as React from 'react'
import { MarkAnnotation, InlineAnnotation } from '../types'
import { tokenise } from '../util/tokeniser'
import Mark from './Mark'
import { spanContainsSpan } from '../util/spans'
import Inline from './Inline'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@commitd/components'
import { BackgroundProperty } from 'csstype'
import Legend from './Legend'
import { getTypeColors } from '../util/colorGenerator'
import { useState } from 'react'

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
  /** Optional. Colour of inline annotations. */
  inlineColor?: string
  /** Optional. An object mapping an mark type to a particular background colour. Will otherwise choose a colour from `markColours` automatically. */
  markColorPresets?: { [index: string]: string }
  /** Optional. Customises how inline mark types are rendered. */
  renderMarkType?: (markType: string) => React.ReactNode
  /** Optional. Whether to fade colour behind text for better readability. Default false  */
  fadeMarks?: boolean
  /** Optional. Do not show the legend. */
  hideLegend?: boolean
}

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: '20px',
    lineHeight: '2.5',
    wordSpacing: '0.05em',
    minWidth: '100px',
    display: 'inline-block',
    whiteSpace: 'pre'
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
  markColors,
  inlineColor,
  markColorPresets,
  renderMarkType,
  fadeMarks,
  hideLegend
}) => {
  const inlineSpanTokens = tokenise(text, inlines)
  const classes = useStyles()
  const markTypes = Array.from(new Set(marks.map(m => m.markType)))
  const markTypeColors = getTypeColors(markTypes, {
    markColorPresets,
    markColors,
    opacity: 0.7
  })

  const [selectedTypes, setSelectedTypes] = useState(markTypes)

  const filteredMarks = marks.filter(m => selectedTypes.includes(m.markType))

  return (
    <div>
      {!hideLegend && (
        <div className={classes.legend}>
          <Legend
            markTypeColors={markTypeColors}
            selectedTypes={selectedTypes}
            fadeMarks={fadeMarks}
            onSelectionChange={setSelectedTypes}
          />
        </div>
      )}
      <div className={classes.text}>
        {inlineSpanTokens.map(rt => {
          const markTokens = tokenise(
            rt.text,
            filteredMarks
              // TODO dont remove entities partially overlapping inline span
              .filter(a => spanContainsSpan(rt, a))
              .map(o => Object.assign({}, o, { offset: o.offset - rt.offset }))
          )
          const inline = rt.annotations.find(i => i)
          const content = (
            <>
              {markTokens.map(t => (
                <Mark
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
                  typographyProps={typographyProps}
                  markTypeColors={markTypeColors}
                  renderMarkType={renderMarkType}
                >
                  <Typography {...typographyProps} display="inline">
                    {t.text}
                  </Typography>
                </Mark>
              ))}
            </>
          )
          return inline ? (
            <Inline inlineColor={inlineColor}>{content}</Inline>
          ) : (
            content
          )
        })}
      </div>
    </div>
  )
}

export default Viewer
