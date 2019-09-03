import * as React from 'react'
import { EntityAnnotation, AnnotationUnion } from '../types'
import { tokenise } from '../util/tokeniser'
import Entity from './Entity'
import { spanContainsSpan } from '../util/spans'
import Relationship from './Relationship'
import { makeStyles } from '@material-ui/core'
import Typography, { TypographyProps } from '@material-ui/core/Typography'

interface ViewerProps {
  text: string
  annotations: AnnotationUnion[]
  onAnnotationClick?: (annotation: AnnotationUnion) => void
  typographyProps?: TypographyProps
  hideEntityType?: boolean
  entityColors?: string[]
  relationshipColor?: string
  entityColorPresets?: { [index: string]: string }
  renderEntityType?: (entityType: string) => React.ReactNode
}
const useStyles = makeStyles(_theme => ({
  text: {
    fontSize: '20px',
    lineHeight: '2.5',
    wordSpacing: '0.05em',
    minWidth: '100px',
    display: 'inline-block'
  }
}))

const Viewer: React.FC<ViewerProps> = ({
  text,
  annotations,
  typographyProps,
  onAnnotationClick,
  hideEntityType,
  entityColors,
  relationshipColor,
  entityColorPresets,
  renderEntityType
}) => {
  const relationshipSpanTokens = tokenise(
    text,
    annotations.filter(a => a.annotationType === 'relationship-span')
  )
  const classes = useStyles()

  return (
    <div className={classes.text}>
      {relationshipSpanTokens.map(rt => {
        const entityTokens = tokenise(
          rt.text,
          annotations
            .filter(a => a.annotationType === 'entity')
            // TODO dont remove entities partially overlapping relationship span
            .filter(a => spanContainsSpan(rt, a))
            .map(o => Object.assign({}, o, { offset: o.offset - rt.offset }))
        )
        const relationship = rt.annotations.find(
          a => a.annotationType === 'relationship-span'
        )
        const content = (
          <>
            {entityTokens.map(t => {
              const entity = t.annotations.find(
                a => a.annotationType === 'entity'
              )
              const text = (
                <Typography {...typographyProps} display="inline">
                  {t.text}
                </Typography>
              )
              return entity == null ? (
                text
              ) : (
                <Entity
                  annotation={entity as EntityAnnotation}
                  hideEntityType={hideEntityType}
                  onClick={
                    onAnnotationClick == null
                      ? undefined
                      : () => onAnnotationClick(entity)
                  }
                  typographyProps={typographyProps}
                  entityColors={entityColors}
                  entityColorPresets={entityColorPresets}
                  renderEntityType={renderEntityType}
                >
                  {text}
                </Entity>
              )
            })}
          </>
        )
        return relationship ? (
          <Relationship relationshipColor={relationshipColor}>
            {content}
          </Relationship>
        ) : (
          content
        )
      })}
    </div>
  )
}

export default Viewer
