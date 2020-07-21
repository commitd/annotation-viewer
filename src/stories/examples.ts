import { action } from '@storybook/addon-actions'
import { Annotation } from '../types'

export const text = `The British people are represented by members of Parliament, not ruled by monarchs. However, after the English Civil War, Oliver Cromwell became Lord Protector, and the monarchy was disbanded.`

export const marks: Annotation[] = [
  {
    offset: 4,
    length: 7,
    type: 'NORP'
  },
  {
    offset: 49,
    length: 10,
    type: 'ORG'
  },
  {
    offset: 99,
    length: 21,
    type: 'EVENT'
  },
  {
    offset: 122,
    length: 15,
    type: 'PERSON'
  },
  {
    offset: 145,
    length: 14,
    type: 'ORG'
  },
  {
    offset: 165,
    length: 12,
    type: 'ORG'
  }
]

export const inlines: Annotation[] = [
  {
    offset: 4,
    length: 55,
    type: 'LINK'
  },
  {
    offset: 122,
    length: 37,
    type: 'LINK'
  }
]

export const overlappingMarks: Annotation[] = [
  {
    offset: 0,
    length: 2,
    type: 'COUNTRY'
  },
  {
    offset: 0,
    length: 17,
    type: 'ROLE'
  },
  {
    offset: 18,
    length: 13,
    type: 'PERSON'
  },
  {
    offset: 45,
    length: 2,
    type: 'COUNTRY'
  },
  // UK capital
  {
    offset: 45,
    length: 10,
    type: 'PLACE'
  }
]

export const overlappingInlines: Annotation[] = [
  //UK prime minister Boris Johnson
  {
    offset: 0,
    length: 31,
    type: 'worksAs'
  },
  // Boris Johnson lives in the UK capital, London
  {
    offset: 18,
    length: 45,
    type: 'livesIn'
  }
]

export const defaultProps = {
  text,
  marks,
  inlines,
  onAnnotationClick: action('clicked on annotation')
}
