export interface Span {
  offset: number
  length: number
}

export interface MarkAnnotation extends Span {
  markType: string
}

export interface InlineAnnotation extends Span {
  inlineType: string
}

export type Annotation = MarkAnnotation | InlineAnnotation
