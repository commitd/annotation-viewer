import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { InlineAnnotation } from 'types'
import { BackgroundProperty } from 'csstype'

interface InlineProps {
  inlines: InlineAnnotation[]
  inlineTypeColors: { [index: string]: BackgroundProperty<string> }
}

const useStyles = makeStyles(_theme => ({
  root: {
    // use inline to put border on wrapped text?
    display: 'inline-block',
    lineHeight: 2.2
  }
}))

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

const Inline: React.FC<InlineProps> = ({
  children,
  inlines,
  inlineTypeColors
}) => {
  let result = <>{children}</>
  let lineHeight = 2.2
  inlines.forEach(i => {
    result = (
      <SingleInline
        inlineColor={inlineTypeColors[i.inlineType]}
        lineHeight={(lineHeight += 0.5)}
      >
        {result}
      </SingleInline>
    )
  })
  return result
}

export default Inline
