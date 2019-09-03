import * as React from 'react'
import { EntityAnnotation } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { generateBackgroundColor } from '../util/colorGenerator'

interface EntityProps {
  annotation: EntityAnnotation
  onClick?: () => void
}
const useStyles = makeStyles(_theme => ({
  root: {
    display: 'inline-block',
    cursor: 'pointer',
    padding: '0.25em 0',
    lineHeight: 1,
    // dont break across multiple lines,
    ['-webkit-box-decoration-break']: 'clone',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out'
  }
}))

const Entity: React.FC<EntityProps> = ({ children, annotation, onClick }) => {
  const classes = useStyles()
  const opacity = 0.3
  const backgroundColor = generateBackgroundColor(
    annotation.entityType,
    opacity
  )
  const border = '1px solid ' + generateBackgroundColor(annotation.entityType)
  return (
    <span
      className={classes.root}
      style={{ backgroundColor, outline: border }}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export default Entity
