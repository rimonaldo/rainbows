import { ColorType } from '../color/type'

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

export interface HarmonyType {
   mainColor: ColorType
   complementary: SchemeType
   monocromatic: SchemeType
   triadic: SchemeType
   analogous: SchemeType
   
   getMonoColors(): SchemeType
   getTriadColors(): SchemeType
   getAnalogColors(): SchemeType
   getCompColor(): SchemeType
   getHarmonyByTitle(title: HarmonyTitle): SchemeType
}
