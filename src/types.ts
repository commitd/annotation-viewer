export interface Span {
  offset: number
  length: number
}

export interface TypedSpan extends Span {
  annotationType: string
}

export interface Annotation extends TypedSpan {
  label?: string
}

export interface EntityAnnotation extends Annotation {
  annotationType: 'entity'
  entityType: string
}

export interface RelationshipSpanAnnotation extends Annotation {
  annotationType: 'relationship-span'
}

export type AnnotationUnion = EntityAnnotation | RelationshipSpanAnnotation
