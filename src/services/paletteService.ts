import { ColorType } from '../types/ColorType'

export const enum PaletteModel {
   Jewl = 'jewl',
   Earth = 'earth',
   Pastel = 'pastel',
   Neon = 'neon',
}

const ranges = {
   [PaletteModel.Jewl]: { s: [0.57, 0.71], l: [0.33, 0.44] },
   [PaletteModel.Pastel]: { s: [0.36, 0.46], l: [0.83, 0.86] },
   [PaletteModel.Earth]: { s: [0.19, 0.22], l: [0.3, 0.85] },
   [PaletteModel.Neon]: { s: [0.8, 1], l: [0.5, 0.6] },
}

type ColorTones = {
   [key: number]: ColorType
   base: number
   onBase: number
   container: number
   onContainer: number
}

// interface MaterialPaletteType {
//    title: string
//    model: PaletteModel
//    primary: ColorTones
//    secondary: ColorTones
//    tertiary: ColorTones
//    error: ColorTones
//    warning: ColorTones
//    success: ColorTones
//    info: ColorTones
//    neutrals: ColorTones[]
// }

interface PaletteType {
   title: string
}

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
