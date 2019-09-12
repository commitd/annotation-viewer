import * as React from 'react'
import { MarkAnnotation } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { BackgroundProperty } from 'csstype'
import { Tooltip } from '@material-ui/core'
import clsx from 'clsx'
import { getTypeColors, getMarkTypeColor } from '../util/colorGenerator'
import tinycolor from 'tinycolor2'
import { defaultMarkColors } from '../util/colorPalette'

interface MarkProps {
  marks: MarkAnnotation[]
  onClick?: () => void
  className?: string
  hideMarkType?: boolean
  markTypeColors?: { [index: string]: BackgroundProperty<string> }
  renderMarkType?: (markType: string) => React.ReactNode
  fade?: boolean
  hideLeftBorder?: boolean
  hideRightBorder?: boolean
  getTooltipText?: ((marks: MarkAnnotation[]) => string) | null
}
const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    cursor: 'pointer',
    lineHeight: 1.75,
    // dont break across multiple lines,
    ['-webkit-box-decoration-break']: 'clone',
    transitionProperty: 'background, background-color, padding',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out',
    borderRadius: theme.shape.borderRadius
  },
  type: {
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    fontSize: '0.5em',
    display: 'inline-block',
    verticalAlign: 'middle',
    opacity: 0.8,
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    color: theme.palette.text.primary,
    userSelect: 'none'
  }
}))

const getBorderStyles = (
  borderColor: string,
  hideLeftBorder?: boolean,
  hideRightBorder?: boolean
): React.CSSProperties => {
  const border = `2px solid ${borderColor}`
  const borderRadiusRight = hideRightBorder ? '0px' : undefined
  const borderRadiusLeft = hideLeftBorder ? '0px' : undefined
  return {
    borderTop: border,
    borderRight: hideRightBorder ? undefined : border,
    borderBottom: border,
    borderLeft: hideLeftBorder ? undefined : border,
    paddingLeft: hideLeftBorder ? undefined : '8px',
    paddingRight: hideRightBorder ? undefined : '8px',
    borderRadius: `${borderRadiusLeft} ${borderRadiusRight} ${borderRadiusRight} ${borderRadiusLeft}`,
    borderTopLeftRadius: borderRadiusLeft,
    borderTopRightRadius: borderRadiusRight,
    borderBottomLeftRadius: borderRadiusLeft,
    borderBottomRightRadius: borderRadiusRight
  }
}

const getBackground = (
  marks: MarkAnnotation[],
  markType: string,
  options: {
    markTypeColors?: { [index: string]: BackgroundProperty<string> }
    fade?: boolean
  } = {}
) => {
  const markTypeColorsDefined =
    options.markTypeColors ||
    getTypeColors(marks.map(m => m.markType), defaultMarkColors)
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
  markTypeColors,
  fade,
  hideLeftBorder,
  hideRightBorder,
  renderMarkType = type => type,
  getTooltipText = marks => marks.map(m => m.markType).join(', ')
}) => {
  const classes = useStyles()

  if (marks.length === 0) {
    return <span>{children}</span>
  }
  const markType = marks.map(m => m.markType).join(', ')
  // const markType = marks.length > 1 ? `#${marks.length}` : marks[0].markType

  const background = getBackground(marks, markType, { markTypeColors, fade })
  // const color = tinycolor(background).isDark() ? '#fff' : '#000'

  const borderColor = tinycolor(
    getMarkTypeColor(marks[0].markType, {
      colorPresets: markTypeColors,
      opacity: 1
    })
  )
    .darken(10)
    .toRgbString()

  const content = (
    <span
      className={clsx(classes.root, className)}
      style={Object.assign(
        {
          background
        },
        getBorderStyles(borderColor, hideLeftBorder, hideRightBorder)
      )}
      onClick={onClick}
    >
      {children}
      {!hideMarkType && (
        <span className={classes.type}>{renderMarkType(markType)}</span>
      )}
    </span>
  )

  return getTooltipText == null ? (
    content
  ) : (
    <Tooltip title={getTooltipText(marks)}>{content}</Tooltip>
  )
}

export default Mark
