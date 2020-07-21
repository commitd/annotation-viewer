import * as React from 'react'
import { makeStyles } from '@committed/components'
import { InlineAnnotation } from 'types'
import { BackgroundProperty } from 'csstype'
import { defaultInlineColors } from '../util/colorPalette'
import { getTypeColors } from '../util/colorGenerator'

interface InlineProps {
  inlines: InlineAnnotation[]
  typeColors?: { [index: string]: BackgroundProperty<string> }
}

const useStyles = makeStyles({
  root: {
    // use inline to put border on wrapped text?
    display: 'inline-block',
    lineHeight: 2.2
  }
})

const SingleInline: React.FC<{ inlineColor: string; lineHeight: number }> = ({
  children,
  inlineColor,
  lineHeight
}) => {
  const classes = useStyles()
  let borderBottom = `3px solid ${inlineColor}`

  return (
    <span className={classes.root} style={{ borderBottom, lineHeight }}>
      {children}
    </span>
  )
}

export const Inline: React.FC<InlineProps> = ({
  children,
  inlines,
  typeColors = getTypeColors(
    inlines.map(m => m.inlineType),
    defaultInlineColors
  )
}) => {
  let result = <>{children}</>
  let lineHeight = 2.2
  inlines.forEach(i => {
    result = (
      <SingleInline
        inlineColor={typeColors[i.inlineType]}
        lineHeight={(lineHeight += 0.5)}
      >
        {result}
      </SingleInline>
    )
  })
  return result
}
