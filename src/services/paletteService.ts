import { ColorType } from '../types/ColorType'
import { PaletteModel } from '../types/PaletteType'
import { Color } from './color.class'
const randomInRange = (min: number, max: number) => {
   return Math.random() * (max - min) + min
}

const randomHue = () => {
   return Math.floor(Math.random() * 360)
}

const h = randomHue()
const s = randomInRange(0.5, 1)
const l = randomInRange(0.4, 0.7 - (1 - s))
export const randomPrimaryHsl = { h, s, l }
