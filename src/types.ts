import { BackgroundProperty } from 'csstype'

/**
 * A span with in the text
 */
export interface Span {
  /** The starting offset in characters of the span */
  offset: number
  /** The length of the span in characters */
  length: number
}

/**
 * An annotation of text.
 *
 * Use to annotate or markup text, an annotation is a typed Span.
 */
export interface Annotation extends Span {
  /** The type of the annotation */
  type: string
}

export interface AnnotationProps {
  /** The annotations to be rendered */
  annotations: Annotation[]
  /** The colors to use for each type */
  typeColors?: { [index: string]: BackgroundProperty<string> }
}

export interface AnnotationConfig {
  /** A className to add to the annotation */
  className?: string
  /** Add a function to supply a tooltip, no tooltip is added if not supplied */
  getTooltipText?: ((annotations: Annotation[]) => string) | null
  /** Supply to add an on click action to the annotation */
  onClick?: (annotations: Annotation[]) => void
}
