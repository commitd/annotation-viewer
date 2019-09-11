import tinycolor2 from 'tinycolor2'
import { defaultMarkColors, defaultInlineColors } from './colorPalette'
// @ts-ignore
import { hashCode } from 'hashcode'
import { BackgroundProperty } from 'csstype'

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
  markType: string,
  colors: BackgroundProperty<string>[],
  options: {
    opacity?: number
    colorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
) => {
  const background: BackgroundProperty<string> =
    (options.colorPresets || {})[markType] ||
    generateHexColorFromPalette(hash(markType) % colors.length, colors)
  if (tinycolor2(background).isValid()) {
    return tinycolor2(
      Object.assign(tinycolor2(background).toRgb(), {
        a: options.opacity == null ? 1 : options.opacity
      })
    ).toRgbString()
  } else {
    return background
  }
}

export const getMarkTypeColor = (
  markType: string,
  options: {
    colors?: BackgroundProperty<string>[]
    opacity?: number
    colorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
) =>
  getTypeColor(markType, options.colors || defaultMarkColors, {
    opacity: options.opacity,
    colorPresets: options.colorPresets
  })

export const getInlineTypeColor = (
  inlineType: string,
  options: {
    colors?: BackgroundProperty<string>[]
    opacity?: number
    colorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
) =>
  getTypeColor(inlineType, options.colors || defaultInlineColors, {
    opacity: options.opacity,
    colorPresets: options.colorPresets
  })

export const getTypeColors = (
  markTypes: string[],
  colors: BackgroundProperty<string>[],
  options: {
    opacity?: number
    colorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
): { [index: string]: BackgroundProperty<string> } => {
  return markTypes.reduce(
    (result: { [index: string]: BackgroundProperty<string> }, type: string) => {
      result[type] = getTypeColor(type, colors, options)
      return result
    },
    {}
  )
}
