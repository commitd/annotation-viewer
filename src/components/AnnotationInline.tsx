import { Tooltip } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React from 'react'
import { AnnotationConfig, AnnotationProps } from '../types'
import { getTypeColors } from '../util/colorGenerator'
import { defaultInlineColors } from '../util/colorPalette'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnnotationInlineConfig extends AnnotationConfig {}

export interface AnnotationInlineProps
  extends AnnotationProps,
    AnnotationInlineConfig {}

const useStyles = makeStyles({
  root: {
    // use inline to put border on wrapped text?
    display: 'inline-block',
    lineHeight: 2.2,
    cursor: (props: Pick<AnnotationInlineProps, 'onClick'>) =>
      props.onClick == null ? 'inherit' : 'pointer',
  },
})

const SingleInline: React.FC<{
  inlineColor: string
  lineHeight: number
}> = ({ children, inlineColor, lineHeight }) => {
  const borderBottom = `3px solid ${inlineColor}`

  return (
    <span
      style={{
        // use inline to put border on wrapped text?
        display: 'inline-block',
        borderBottom,
        lineHeight,
      }}
    >
      {children}
    </span>
  )
}

/**
 * This component renders the annotations a underlines of the text.
 *
 * You can optionally supply a tooltip and onClick action.
 *
 */
export const AnnotationInline: React.FC<AnnotationInlineProps> = ({
  children,
  annotations,
  className,
  typeColors = getTypeColors(
    annotations.map((m) => m.type),
    defaultInlineColors
  ),
  getTooltipText,
  onClick,
}) => {
  const classes = useStyles({ onClick })
  let content = <>{children}</>
  let lineHeight = 2.2
  annotations.forEach((i) => {
    content = (
      <SingleInline
        inlineColor={typeColors[i.type]}
        lineHeight={(lineHeight += 0.5)}
      >
        {content}
      </SingleInline>
    )
  })

  content = (
    <span
      className={clsx(classes.root, className)}
      onClick={() => onClick && onClick(annotations)}
    >
      {content}
    </span>
  )

  const tooltip = getTooltipText && getTooltipText(annotations)
  return !tooltip ? content : <Tooltip title={tooltip}>{content}</Tooltip>
}
