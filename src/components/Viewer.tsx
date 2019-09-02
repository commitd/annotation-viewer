import * as React from 'react'
import { Annotation, EntityAnnotation } from '../types'
import { tokenise } from '../util/tokeniser'
import Entity from './Entity'

interface ViewerProps {
  text: string
  annotations: Annotation[]
  onAnnotationClick?: (annotation: Annotation) => void
  renderText?: (text: string) => React.ReactNode
}

const Viewer: React.FC<ViewerProps> = ({
  text,
  annotations,
  renderText = (t: string) => <>{t}</>,
  onAnnotationClick
}) => {
  const tokens = tokenise(
    text,
    annotations.filter(a => a.annotationType === 'entity')
  )

  return (
    <>
      {tokens.map(t => {
        const entity = t.annotations.find(a => a.annotationType === 'entity')
        const text = renderText(t.text)
        return entity == null ? (
          text
        ) : (
          <Entity
            annotation={entity as EntityAnnotation}
            onClick={onAnnotationClick}
          >
            {text}
          </Entity>
        )
      })}
    </>
  )
}

export default Viewer
