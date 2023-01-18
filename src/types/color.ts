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
   hsvToRgb(hsv: hsv): rgb
   rgbToHex(rgb: rgb): hex
   getTriadHsls(): hsl[]
   getCompHsls(): hsl[]
   getMonoHsls(): hsl[]
   getAnalogHsls(): hsl[]
   
   getTriadHsvs(): hsv[]
   getCompHsvs(): hsv[]
   getMonoHsvs(): hsv[]
   getAnalogHsvs(): hsv[]
   splitHsl(): hsl
   _normalize(rgb: rgb): rgb
   _hueToRgbVal(p: number, q: number, t: number): number
}
