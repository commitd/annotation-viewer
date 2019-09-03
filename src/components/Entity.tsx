import * as React from 'react'
import { EntityAnnotation } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { generateBackground } from '../util/colorGenerator'
import tinycolor from 'tinycolor2'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import { BackgroundProperty } from 'csstype'
import { Tooltip } from '@material-ui/core'

interface EntityProps {
  annotation: EntityAnnotation
  onClick?: () => void
  hideEntityType?: boolean
  typographyProps?: TypographyProps
  entityColors?: BackgroundProperty<string>[]
  entityColorPresets?: { [index: string]: string }
  renderEntityType?: (entityType: string) => React.ReactNode
}
const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    cursor: 'pointer',
    padding: '0.25em',
    lineHeight: 1,
    // dont break across multiple lines,
    ['-webkit-box-decoration-break']: 'clone',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out',
    borderRadius: theme.shape.borderRadius
  },
  type: {
    padding: '.2em .3em',
    margin: '0 .25em',
    lineHeight: 1,
    display: 'inline-block',
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    color: theme.palette.text.primary,
    userSelect: 'none'
  }
}))

const getBorder = (backgroundColor: string) =>
  '2px solid ' +
  tinycolor(backgroundColor)
    .darken(10)
    .toRgbString()

const Entity: React.FC<EntityProps> = ({
  children,
  annotation,
  onClick,
  hideEntityType,
  typographyProps,
  entityColors,
  entityColorPresets,
  renderEntityType = type => type
}) => {
  const classes = useStyles()
  const background = generateBackground(annotation.entityType, {
    entityColors,
    entityColorPresets
  })
  const color = tinycolor(background).isDark() ? '#fff' : '#000'

  return (
    <Tooltip title={annotation.entityType}>
      <span
        className={classes.root}
        style={{ background, border: getBorder(background), color }}
        onClick={onClick}
      >
        {children}
        {!hideEntityType && (
          <Typography className={classes.type} {...typographyProps}>
            {renderEntityType(annotation.entityType)}
          </Typography>
        )}
      </span>
    </Tooltip>
  )
}

export default Entity
