import { action } from '@storybook/addon-actions'
import { InlineAnnotation, MarkAnnotation } from '../types'

export const text = `The British people are represented by members of Parliament, not ruled by monarchs. However, after the English Civil War, Oliver Cromwell became Lord Protector, and the monarchy was disbanded.`

export const marks: MarkAnnotation[] = [
  {
    offset: 4,
    length: 7,
    markType: 'NORP'
  },
  {
    offset: 49,
    length: 10,
    markType: 'ORG'
  },
  {
    offset: 99,
    length: 21,
    markType: 'EVENT'
  },
  {
    offset: 122,
    length: 15,
    markType: 'PERSON'
  },
  {
    offset: 145,
    length: 14,
    markType: 'ORG'
  },
  {
    offset: 165,
    length: 12,
    markType: 'ORG'
  }
]

export const inlines: InlineAnnotation[] = [
  {
    offset: 4,
    length: 55,
    inlineType: 'LINK'
  },
  {
    offset: 122,
    length: 37,
    inlineType: 'LINK'
  }
]

export const overlappingMarks: MarkAnnotation[] = [
  {
    offset: 0,
    length: 2,
    markType: 'COUNTRY'
  },
  {
    offset: 0,
    length: 17,
    markType: 'ROLE'
  },
  {
    offset: 18,
    length: 13,
    markType: 'PERSON'
  },
  {
    offset: 45,
    length: 2,
    markType: 'COUNTRY'
  },
  // UK capital
  {
    offset: 45,
    length: 10,
    markType: 'PLACE'
  }
]

export const overlappingInlines: InlineAnnotation[] = [
  //UK prime minister Boris Johnson
  {
    offset: 0,
    length: 31,
    inlineType: 'worksAs'
  },
  // Boris Johnson lives in the UK capital, London
  {
    offset: 18,
    length: 45,
    inlineType: 'livesIn'
  }
]

export const defaultProps = {
  text,
  marks,
  inlines,
  onAnnotationClick: action('clicked on annotation')
}
