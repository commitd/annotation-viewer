import { Span } from '../types'

export const isIntersecting = (s1: Span, s2: Span) =>
  spanContainsIndex(s1, s2.offset) ||
  spanContainsSpan(s1, s2) ||
  (s1.offset <= s2.offset && s2.offset < getEnd(s1)) ||
  (s2.offset <= s1.offset && s1.offset < getEnd(s2))

export const getEnd = (span: Span) => span.offset + span.length

const spanContainsIndex = (span: Span, index: number) =>
  span.offset <= index && index < getEnd(span)

const spanContainsSpan = (s1: Span, s2: Span) =>
  s1.offset <= s2.offset && getEnd(s2) <= getEnd(s1)
