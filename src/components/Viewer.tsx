import * as React from 'react'
import { EntityAnnotation, AnnotationUnion } from '../types'
import { tokenise } from '../util/tokeniser'
import Entity from './Entity'
import { spanContainsSpan } from '../util/spans'
import Relationship from './Relationship'

interface ViewerProps {
  text: string
  annotations: AnnotationUnion[]
  onAnnotationClick?: (annotation: AnnotationUnion) => void
  renderText?: (text: string) => React.ReactNode
}

const Viewer: React.FC<ViewerProps> = ({
  text,
  annotations,
  renderText = (t: string) => <>{t}</>,
  onAnnotationClick
}) => {
  const relationshipSpanTokens = tokenise(
    text,
    annotations.filter(a => a.annotationType === 'relationship-span')
  )

  return (
    <>
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
        const TokenComponent = relationship ? Relationship : React.Fragment
        return (
          <TokenComponent>
            {entityTokens.map(t => {
              const entity = t.annotations.find(
                a => a.annotationType === 'entity'
              )
              const text = renderText(t.text)
              return entity == null ? (
                text
              ) : (
                <Entity
                  annotation={entity as EntityAnnotation}
                  onClick={
                    onAnnotationClick == null
                      ? undefined
                      : () => onAnnotationClick(entity)
                  }
                >
                  {text}
                </Entity>
              )
            })}
          </TokenComponent>
        )
      })}
    </>
  )
}

export default Viewer
