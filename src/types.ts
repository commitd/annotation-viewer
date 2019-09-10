export interface Span {
  offset: number
  length: number
}

export interface MarkAnnotation extends Span {
  markType: string
}

export interface InlineAnnotation extends Span {}

export type Annotation = MarkAnnotation | InlineAnnotation
