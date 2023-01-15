type hex = string
type rgb = { r: number; g: number; b: number }
type hsl = { h: number; s: number; l: number }
type hsv = { h: number; s: number; v: number }
import { ColorType } from './color'

export type HarmonyType = {
   type: string
   mainColor: ColorType
   colors: string[]
}
