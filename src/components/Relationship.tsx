import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'

interface RelationshipProps {}

const useStyles = makeStyles(theme => ({
  root: {}
}))

const Relationship: React.FC<RelationshipProps> = ({ children }) => {
  const classes = useStyles()
  let borderBottom = `3px solid ${indigo[700]}`

  return (
    <span className={classes.root} style={{ borderBottom }}>
      {children}
    </span>
  )
}

export default Relationship
