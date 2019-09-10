import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { colors } from '@commitd/components'

interface InlineProps {
  inlineColor?: string
}

const useStyles = makeStyles(_theme => ({
  root: {
    // use inline to put border on wrapped text?
    display: 'inline-block'
  }
}))

const Inline: React.FC<InlineProps> = ({ children, inlineColor }) => {
  const classes = useStyles()
  let borderBottom = `3px dashed ${inlineColor || colors.indigo[700]}`

  return (
    <div className={classes.root} style={{ borderBottom }}>
      {children}
    </div>
  )
}

export default Inline
