import tinycolor2 from 'tinycolor2'
import { defaultMarkColors } from './colorPalette'
// @ts-ignore
import { hashCode } from 'hashcode'
import { BackgroundProperty } from 'csstype'

export function hash(o: string): number {
  return Math.abs(hashCode().value(o))
}

export const generateHexColorFromPalette = (
  index: number,
  markColors = defaultMarkColors
): string => {
  const absHashCode = Math.abs(index)
  if (markColors.length - 1 < absHashCode) {
    const maxValue = (markColors.length - 1).toString()
    throw new Error('Hash code invalid, must be less than' + maxValue)
  }
  return markColors[absHashCode]
}

export const getTypeColor = (
  markType: string,
  options: {
    opacity?: number
    markColors?: BackgroundProperty<string>[]
    markColorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
) => {
  const colors =
    options.markColors == null ? defaultMarkColors : options.markColors
  const background: BackgroundProperty<string> =
    (options.markColorPresets || {})[markType] ||
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

export const getTypeColors = (
  markTypes: string[],
  options: {
    opacity?: number
    markColors?: BackgroundProperty<string>[]
    markColorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
): { [index: string]: BackgroundProperty<string> } => {
  return markTypes.reduce(
    (result: { [index: string]: BackgroundProperty<string> }, type: string) => {
      result[type] = getTypeColor(type, options)
      return result
    },
    {}
  )
}
