import { ColorType } from './ColorType'

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

export type SchemeType = {
   title: HarmonyTitle
   mainColor: ColorType
   colors: ColorType[]

}

export interface Harmony {
   mainColor: ColorType
   monocromatic: SchemeType
   triadic: SchemeType
   complementary: SchemeType
   analogous: SchemeType

   getMonocromatic(): SchemeType
   getTriadic(): SchemeType
   getComplementary(): SchemeType
   getAnalogous(): SchemeType
   getHarmonyByTitle(title: HarmonyTitle): SchemeType
   getHarmonies(): SchemeType[]
}
