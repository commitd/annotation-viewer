import clsx from 'clsx'

import React from 'react'
import tinycolor from 'tinycolor2'
import { Annotation } from '../types'
import { getTypeColors } from '../util/colorGenerator'
import { defaultMarkColors } from '../util/colorPalette'
import { AnnotationProps, AnnotationConfig } from '../types'
import { makeStyles, Tooltip } from '@material-ui/core'

export interface AnnotationMarkConfig extends AnnotationConfig {
  /** By default the annotation type is shown alongside the mark set false to disable */
  hideType?: boolean
  /** By default the type is rendered as text, supply type to react node function to customize */
  renderType?: (type: string) => React.ReactNode
  /** Set true to fade the colors */
  fade?: boolean
  /**
   * Contrast text color when background is dark, defaults to 'inherit'
   */
  lightTextColor?: string
  /**
   * Contrast text color when background is light,, defaults to 'inherit'
   */
  darkTextColor?: string
}

export interface AnnotationMarkProps
  extends AnnotationProps,
    AnnotationMarkConfig {
  /** flag to hide left border, for use when mark is split. */
  hideLeftBorder?: boolean
  /** flag to hide right border, for use when mark is split. */
  hideRightBorder?: boolean
  /** Flag for use in legend to indicate type is included or not. */
  included?: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    cursor: (props: AnnotationMarkProps) =>
      props.onClick == null ? 'inherit' : 'pointer',
    lineHeight: 1.75,
    // don't break across multiple lines,
    ['-webkit-box-decoration-break']: 'clone',
    transitionProperty: 'background, background-color, padding',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out',
    borderRadius: theme.shape.borderRadius,
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
    userSelect: 'none',
  },
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
    borderBottomRightRadius: borderRadiusRight,
  }
}

const getBackground = (
  marks: Annotation[],
  type: string,
  typeColors: { [index: string]: string },
  fade: boolean
) => {
  let ongoing = 0
  const stripeLength = 5
  const bg =
    marks.length > 1
      ? `repeating-linear-gradient(135deg, ${marks
          .map((m) => typeColors[m.type])
          .map(
            (col) =>
              `${col} ${ongoing}px, ${col} ${(ongoing += stripeLength)}px`
          )
          .join(', ')})`
      : typeColors[type]

  return fade
    ? `linear-gradient(transparent -10%,rgba(255,255,255,0.7) 50%, transparent 110%), ${bg}`
    : bg
}

/**
 * This component renders the annotations by coloring the background of the text.
 *
 * You can optionally include the type inline and provide tooltip, onClick and multiple render options
 */
export const AnnotationMark: React.FC<AnnotationMarkProps> = (props) => {
  const {
    children,
    className,
    annotations,
    onClick,
    typeColors = getTypeColors(
      annotations.map((m) => m.type),
      defaultMarkColors,
      { opacity: 0.7 }
    ),
    hideLeftBorder,
    hideRightBorder,
    hideType = false,
    fade = false,
    lightTextColor = 'inherit',
    darkTextColor = 'inherit',
    renderType = (type) => type,
    getTooltipText,
    included = true,
  } = props
  const classes = useStyles(props)

  if (annotations.length === 0) {
    return <span>{children}</span>
  }
  const type = annotations.map((m) => m.type).join(', ')

  const backgroundColor = getBackground(annotations, type, typeColors, fade)
  const background = included ? backgroundColor : 'transparent'
  const color = tinycolor(background).isDark() ? lightTextColor : darkTextColor

  const borderColor = tinycolor(backgroundColor).darken(10).toRgbString()

  const style = Object.assign(
    {
      background,
      color,
    },
    getBorderStyles(borderColor, hideLeftBorder, hideRightBorder)
  )

  const content = (
    <span
      className={clsx(classes.root, className)}
      style={style}
      onClick={(e) => {
        onClick && onClick(annotations)
        onClick && e.stopPropagation()
      }}
    >
      {children}
      {!hideType && <span className={classes.type}>{renderType(type)}</span>}
    </span>
  )

  const tooltip = getTooltipText && getTooltipText(annotations)
  return !tooltip ? content : <Tooltip title={tooltip}>{content}</Tooltip>
}
