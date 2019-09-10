import { Span } from '../types'
import { isIntersecting, getEnd } from './spans'

interface Event {
  index: number
}

export interface Token<A extends Span> extends Span {
  annotations: A[]
  text: string
}

const byIndexAscending = (a: Event, b: Event) => a.index - b.index

export const tokenise = <A extends Span>(
  text: string,
  annotations: A[]
): Token<A>[] => {
  const events = annotations
    .flatMap(a => [{ index: a.offset, annotations }, { index: getEnd(a) }])
    .sort(byIndexAscending)

  let lastTokenEnd = 0

  const spans: Span[] = events.flatMap(e => {
    const tokens =
      e.index > lastTokenEnd
        ? [
            {
              offset: lastTokenEnd,
              length: e.index - lastTokenEnd
            }
          ]
        : []
    lastTokenEnd = e.index
    return tokens
  })
  if (lastTokenEnd < text.length) {
    spans.push({ offset: lastTokenEnd, length: text.length - lastTokenEnd })
  }

  return spans.map(s => ({
    ...s,
    text: text.substr(s.offset, s.length),
    annotations: annotations.filter(a => isIntersecting(s, a))
  }))
}
