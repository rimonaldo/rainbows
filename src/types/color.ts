type hex = string
type rgb = { r: number; g: number; b: number }
type hsl = { h: number; s: number; l: number }
type hsv = { h: number; s: number; v: number }

export interface ColorType {
   hex: hex
   rgb: rgb
   hsl: hsl
   hsv: hsv

   hexToRgb(hex: hex): rgb
   rgbToHsl(rgb: rgb): hsl
   rgbToHsv(rgb: rgb): hsv
   hslToRgb(hsl: hsl): rgb
   hsvToRgb(hsl: hsv): rgb

   _normalize(rgb: rgb): rgb
   _hueToRgbVal(p: number, q: number, t: number): number
}


