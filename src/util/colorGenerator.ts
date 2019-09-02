import * as tinycolor from 'tinycolor2'
import { colorPalette, presets } from './colorPalette'
// @ts-ignore
import { hashCode } from 'hashcode'

export function hash(o: string): number {
  return Math.abs(hashCode().value(o))
}

export const generateHexColorFromPalette = (index: number): string => {
  const absHashCode = Math.abs(index)
  if (colorPalette.length - 1 < absHashCode) {
    const maxValue = (colorPalette.length - 1).toString()
    throw new Error('Hash code invalid, must be less than' + maxValue)
  }
  return colorPalette[absHashCode]
}

export const generateBackgroundColor = (
  entityType: string,
  opacity: number = 1
) => {
  const hexColor: string =
    presets[entityType] ||
    generateHexColorFromPalette(hash(entityType) % colorPalette.length)
  return tinycolor(
    Object.assign(tinycolor(hexColor).toRgb(), { a: opacity })
  ).toRgbString()
}
