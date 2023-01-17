import { ColorType } from './color'

type hex = string
type rgb = { r: number; g: number; b: number }
type hsl = { h: number; s: number; l: number }
type hsv = { h: number; s: number; v: number }

export enum HarmonyTitle {
   Monochromatic = 'monochromatic',
   Triadic = 'triadic',
   Complementary = 'complementary',
   Analogous = 'analogous',
}

export type HarmonyType = {
   title: HarmonyTitle
   mainColor: ColorType
   colors: string[]
}
