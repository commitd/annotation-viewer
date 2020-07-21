import { useState, useMemo } from 'react'
import { InlineAnnotation, MarkAnnotation } from '../types'
import { BackgroundProperty } from 'csstype'
import { getTypeColors } from '../util/colorGenerator'
import { defaultMarkColors, defaultInlineColors } from '../util/colorPalette'

/**
 * Utility hook for the use of AnnotationView and AnnotationLegend together/
 *
 *
 * @param marks A list of mark  annotations to render over the text. Annotations consist of offsets in `text`.
 * @param inlines A list of inline annotations to render over the text. Annotations consist of offsets in `text`.
 *
 * @typedef {Object} : AnnotationProperties
 * @property {string[]} markTypes - the types of the marks given
 * @property {string[]} inlineTypes - the types of the inlines given
 * @property {MarkAnnotation[]} filteredMarks - marks filtered by selected types
 * @property {MarkAnnotation[]} filteredInlines - inlines filtered by selected types
 * @property {string[]} selectedTypes - the types selected
 * @property {(type: string) => void} toggleType - function to toggle selection of a type
 *
 * @return {AnnotationProperties} The derived annotations data
 */
export function useAnnotation(
  marks: MarkAnnotation[],
  inlines: InlineAnnotation[],
  colorPresets?: { [key: string]: BackgroundProperty<string> }
) {
  const markTypes = Array.from(new Set(marks.map(m => m.markType)))
  const inlineTypes = Array.from(new Set(inlines.map(i => i.inlineType)))

  const [selectedTypes, setSelectedTypes] = useState(
    markTypes.concat(inlineTypes)
  )

  const toggleType = (type: string) => {
    selectedTypes.includes(type)
      ? setSelectedTypes(selectedTypes.filter(t => t !== type))
      : setSelectedTypes(selectedTypes.concat([type]))
  }

  const filteredMarks = marks.filter(m => selectedTypes.includes(m.markType))
  const filteredInlines = inlines.filter(i =>
    selectedTypes.includes(i.inlineType)
  )

  const typeColors = useMemo(
    () =>
      Object.assign(
        getTypeColors(
          marks.map(m => m.markType),
          defaultMarkColors,
          { colorPresets, opacity: 0.7 }
        ),
        getTypeColors(
          inlines.map(m => m.inlineType),
          defaultInlineColors,
          { colorPresets }
        )
      ),
    [marks, inlines, colorPresets]
  )

  return {
    markTypes,
    inlineTypes,
    filteredMarks,
    filteredInlines,
    selectedTypes,
    toggleType,
    typeColors
  }
}
