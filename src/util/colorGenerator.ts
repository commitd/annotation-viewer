import tinycolor2 from 'tinycolor2'
import { defaultEntityColors } from './colorPalette'
// @ts-ignore
import { hashCode } from 'hashcode'
import { BackgroundProperty } from 'csstype'

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

export const generateBackground = (
  entityType: string,
  options: {
    opacity?: number
    entityColors?: BackgroundProperty<string>[]
    entityColorPresets?: { [index: string]: BackgroundProperty<string> }
  } = {}
) => {
  const background: BackgroundProperty<string> =
    (options.entityColorPresets || {})[entityType] ||
    generateHexColorFromPalette(
      hash(entityType) % (options.entityColors || defaultEntityColors).length
    )
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
