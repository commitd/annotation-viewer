import { makeStyles, Tooltip } from '@committed/components'
import clsx from 'clsx'
import { BackgroundProperty, ColorProperty } from 'csstype'
import * as React from 'react'
import tinycolor from 'tinycolor2'
import { MarkAnnotation } from '../types'
import { getTypeColors } from '../util/colorGenerator'
import { defaultMarkColors } from '../util/colorPalette'

export interface MarkProps {
  marks: MarkAnnotation[]
  onClick?: () => void
  className?: string
  hideType?: boolean
  typeColors?: { [index: string]: BackgroundProperty<string> }
  renderType?: (markType: string) => React.ReactNode
  fade?: boolean
  hideLeftBorder?: boolean
  hideRightBorder?: boolean
  getTooltipText?: ((marks: MarkAnnotation[]) => string) | null
  /**
   * Contrast text color when background is dark, defaults to 'inherit'
   */
  lightTextColor?: ColorProperty
  /**
   * Contrast text color when background is light,, defaults to 'inherit'
   */
  darkTextColor?: ColorProperty
  /**
   * Flag for use in legend to indicate type is included or not.
   */
  included?: boolean
}
const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    cursor: 'pointer',
    lineHeight: 1.75,
    // don't break across multiple lines,
    ['-webkit-box-decoration-break']: 'clone',
    transitionProperty: 'background, background-color, padding',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out',
    borderRadius: theme.shape.borderRadius
  },
  type: {
    padding: `${theme.spacing(0)}px ${theme.spacing(1)}px`,
    marginLeft: theme.spacing(1),
    fontSize: '0.5em',
    display: 'inline-block',
    verticalAlign: 'middle',
    opacity: 0.8,
    borderRadius: theme.shape.borderRadius,
    background:
      theme.palette.type === 'light'
        ? theme.palette.background.default
        : theme.palette.action.active,
    color:
      theme.palette.type === 'light'
        ? theme.palette.text.primary
        : theme.palette.text.hint,
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
  typeColors: { [index: string]: BackgroundProperty<string> },
  fade: boolean
) => {
  let ongoing = 0
  const stripeLength = 5
  const bg =
    marks.length > 1
      ? `repeating-linear-gradient(135deg, ${marks
          .map(m => typeColors[m.markType])
          .map(
            col => `${col} ${ongoing}px, ${col} ${(ongoing += stripeLength)}px`
          )
          .join(', ')})`
      : typeColors[markType]

  return fade
    ? `linear-gradient(transparent -10%,rgba(255,255,255,0.7) 50%, transparent 110%), ${bg}`
    : bg
}

export const Mark: React.FC<MarkProps> = ({
  children,
  className,
  marks,
  onClick,
  typeColors = getTypeColors(
    marks.map(m => m.markType),
    defaultMarkColors,
    { opacity: 0.7 }
  ),
  hideLeftBorder,
  hideRightBorder,
  hideType = false,
  fade = false,
  lightTextColor = 'inherit',
  darkTextColor = 'inherit',
  renderType = type => type,
  getTooltipText = marks => marks.map(m => m.markType).join(', '),
  included = true
}) => {
  const classes = useStyles()

  if (marks.length === 0) {
    return <span>{children}</span>
  }
  const markType = marks.map(m => m.markType).join(', ')

  const backgroundColor = getBackground(marks, markType, typeColors, fade)
  const background = included ? backgroundColor : 'transparent'
  const color = tinycolor(background).isDark() ? lightTextColor : darkTextColor

  const borderColor = tinycolor(backgroundColor)
    .darken(10)
    .toRgbString()

  const style = Object.assign(
    {
      background,
      color
    },
    getBorderStyles(borderColor, hideLeftBorder, hideRightBorder)
  )

  const content = (
    <span
      className={clsx(classes.root, className)}
      style={style}
      onClick={onClick}
    >
      {children}
      {!hideType && (
        <span className={classes.type}>{renderType(markType)}</span>
      )}
    </span>
  )

  return getTooltipText == null ? (
    content
  ) : (
    <Tooltip title={getTooltipText(marks)}>{content}</Tooltip>
  )
}
