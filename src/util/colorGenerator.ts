import { BackgroundProperty } from 'csstype'
// @ts-ignore
import { hashCode } from 'hashcode'
import tinycolor2 from 'tinycolor2'
import { Annotation } from '../types'
import { defaultInlineColors, defaultMarkColors } from './colorPalette'

export function hash(o: string): number {
  return Math.abs(hashCode().value(o))
}

export const generateHexColorFromPalette = (
  index: number,
  colors: BackgroundProperty<string>[]
): string => {
  const absHashCode = Math.abs(index)
  if (colors.length - 1 < absHashCode) {
    const maxValue = (colors.length - 1).toString()
    throw new Error('Hash code invalid, must be less than' + maxValue)
  }
  return colors[absHashCode]
}

const getTypeColor = (
  type: string,
  colors: BackgroundProperty<string>[],
  options: {
    opacity?: number
    colorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
): BackgroundProperty<string> => {
  const background: BackgroundProperty<string> =
    (options.colorPresets || {})[type] ||
    generateHexColorFromPalette(hash(type) % colors.length, colors)
  if (tinycolor2(background).isValid()) {
    return tinycolor2(
      Object.assign(tinycolor2(background).toRgb(), {
        a: options.opacity == null ? 1 : options.opacity,
      })
    ).toRgbString()
  } else {
    return background
  }
}

export const getTypeColors = (
  types: string[],
  colors: BackgroundProperty<string>[],
  options: {
    opacity?: number
    colorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
): { [index: string]: BackgroundProperty<string> } => {
  return types.reduce(
    (result: { [index: string]: BackgroundProperty<string> }, type: string) => {
      result[type] = getTypeColor(type, colors, options)
      return result
    },
    {}
  )
}

export function createTypeColors(
  /** A list of mark annotation types. */
  types: string[],
  /** A list of inline annotation types. */
  inlineTypes: string[],
  /**  Optional. List of possible mark annotation. background colours. Accepts any css background value e.g. hex colour, gradient, etc. */
  markColors: BackgroundProperty<string>[] = defaultMarkColors,
  /**  Optional. List of possible mark annotation. background colours. Accepts any css background value e.g. hex colour, gradient, etc. */
  inlineColors: BackgroundProperty<string>[] = defaultInlineColors,
  /** Optional. An object mapping an mark/inline type to a particular background colour. Will otherwise choose a colour from `markColours` automatically. */
  colorPresets?: { [index: string]: string }
): { [key: string]: BackgroundProperty<string> } {
  const typeColors = getTypeColors(types, markColors, {
    colorPresets,
    opacity: 0.7,
  })
  const inlineTypeColors = getTypeColors(inlineTypes, inlineColors, {
    colorPresets,
  })

  return Object.assign({}, typeColors, inlineTypeColors)
}

export function createAnnotationColors(
  /** A list of mark  annotations to render over the text. Annotations consist of offsets in `text`. */
  marks: Annotation[],
  /** A list of inline annotations to render over the text. Annotations consist of offsets in `text`. */
  inlines: Annotation[],
  /**  Optional. List of possible mark annotation. background colours. Accepts any css background value e.g. hex colour, gradient, etc. */
  markColors: BackgroundProperty<string>[] = defaultMarkColors,
  /**  Optional. List of possible mark annotation. background colours. Accepts any css background value e.g. hex colour, gradient, etc. */
  inlineColors: BackgroundProperty<string>[] = defaultInlineColors,
  /** Optional. An object mapping an mark/inline type to a particular background colour. Will otherwise choose a colour from `markColours` automatically. */
  colorPresets?: { [index: string]: string }
): { [key: string]: BackgroundProperty<string> } {
  const markTypes = Array.from(new Set(marks.map((m) => m.type)))
  const inlineTypes = Array.from(new Set(inlines.map((i) => i.type)))

  return createTypeColors(
    markTypes,
    inlineTypes,
    markColors,
    inlineColors,
    colorPresets
  )
}
