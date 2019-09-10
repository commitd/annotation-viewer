import * as React from 'react'
import { MarkAnnotation } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@commitd/components'
import { BackgroundProperty } from 'csstype'
import { Tooltip } from '@material-ui/core'
import clsx from 'clsx'
import { getTypeColors } from '../util/colorGenerator'

interface MarkProps {
  marks: MarkAnnotation[]
  onClick?: () => void
  className?: string
  hideMarkType?: boolean
  typographyProps?: React.ComponentProps<typeof Typography>
  markTypeColors?: { [index: string]: BackgroundProperty<string> }
  renderMarkType?: (markType: string) => React.ReactNode
  fade?: boolean
}
const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    cursor: 'pointer',
    padding: '0.25em 0',
    lineHeight: 1,
    // dont break across multiple lines,
    ['-webkit-box-decoration-break']: 'clone',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out',
    // textStroke: '1px black',
    webkitFontSmoothing: 'antialiased',
    fontSize: 24
  },
  type: {
    padding: '0.3em',
    margin: '0 .25em',
    fontSize: '0.5em',
    lineHeight: 1,
    display: 'inline-block',
    verticalAlign: 'middle',
    opacity: 0.9,
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    color: theme.palette.text.primary,
    userSelect: 'none'
  }
}))

// const getBorder = (backgroundColor: string) =>
//   '2px solid ' +
//   tinycolor(backgroundColor)
//     .darken(10)
//     .toRgbString()

const getBackground = (
  marks: MarkAnnotation[],
  markType: string,
  options: {
    markTypeColors?: { [index: string]: BackgroundProperty<string> }
    fade?: boolean
  } = {}
) => {
  const markTypeColorsDefined =
    options.markTypeColors || getTypeColors(marks.map(m => m.markType))
  let ongoing = 0
  const stripeLength = 5
  const bg =
    marks.length > 1
      ? `repeating-linear-gradient(135deg, ${marks
          .map(m => markTypeColorsDefined[m.markType])
          .map(
            col => `${col} ${ongoing}px, ${col} ${(ongoing += stripeLength)}px`
          )
          .join(', ')})`
      : markTypeColorsDefined[markType]

  return options.fade
    ? `linear-gradient(transparent -10%,rgba(255,255,255,0.7) 50%, transparent 110%), ${bg}`
    : bg
}

const Mark: React.FC<MarkProps> = ({
  children,
  className,
  marks,
  onClick,
  hideMarkType,
  typographyProps,
  markTypeColors,
  fade,
  renderMarkType = type => type
}) => {
  const classes = useStyles()

  if (marks.length === 0) {
    return <>{children}</>
  }
  const markType = marks.map(m => m.markType).join(', ')
  // const markType = marks.length > 1 ? `#${marks.length}` : marks[0].markType

  const background = getBackground(marks, markType, { markTypeColors, fade })
  // const color = tinycolor(background).isDark() ? '#fff' : '#000'

  return (
    <Tooltip title={markType}>
      <span
        className={clsx(classes.root, className)}
        style={{ background /*border: getBorder(background), color*/ }}
        onClick={onClick}
      >
        {children}
        {!hideMarkType && (
          <Typography className={classes.type} {...typographyProps}>
            {renderMarkType(markType)}
          </Typography>
        )}
      </span>
    </Tooltip>
  )
}

export default Mark
