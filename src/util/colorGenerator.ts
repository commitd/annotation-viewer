import tinycolor2 from 'tinycolor2'
import { defaultEntityColors } from './colorPalette'
// @ts-ignore
import { hashCode } from 'hashcode'
import { BackgroundColorProperty } from 'csstype'

export function hash(o: string): number {
  return Math.abs(hashCode().value(o))
}

export const generateHexColorFromPalette = (
  index: number,
  entityColors = defaultEntityColors
): string => {
  const absHashCode = Math.abs(index)
  if (entityColors.length - 1 < absHashCode) {
    const maxValue = (entityColors.length - 1).toString()
    throw new Error('Hash code invalid, must be less than' + maxValue)
  }
  return entityColors[absHashCode]
}

export const generateBackgroundColor = (
  entityType: string,
  options: {
    opacity?: number
    entityColors?: BackgroundColorProperty[]
    entityColorPresets?: { [index: string]: string }
  } = {}
) => {
  const hexColor: string =
    (options.entityColorPresets || {})[entityType] ||
    generateHexColorFromPalette(
      hash(entityType) % (options.entityColors || defaultEntityColors).length
    )
  return tinycolor2(
    Object.assign(tinycolor2(hexColor).toRgb(), {
      a: options.opacity == null ? 1 : options.opacity
    })
  ).toRgbString()
}
