import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'

interface RelationshipProps {
  relationshipColor?: string
}

const useStyles = makeStyles(_theme => ({
  root: {
    // use inline to put border on wrapped text?
    display: 'inline-block'
  }
}))

const Relationship: React.FC<RelationshipProps> = ({
  children,
  relationshipColor
}) => {
  const classes = useStyles()
  let borderBottom = `3px dashed ${relationshipColor || indigo[700]}`

  return (
    <div className={classes.root} style={{ borderBottom }}>
      {children}
    </div>
  )
}

export default Relationship
