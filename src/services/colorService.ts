import { hex, rgb, hsl, hsv } from '../types/colorTypes'
export const colorService = {
   rgbToHsl,
   rgbToHsv,
   hslToRgb,
   hsvToRgb,
   rgbToHex,
}

export function rgbToHex({ r, g, b }: rgb): hex {
   return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

export function hexToRgb(hex: hex): rgb {
   // Parse the hex string into its individual parts
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
   // If the hex string is invalid, return an empty object
   if (!result) {
      return { r: 0, g: 0, b: 0 }
   }

   // Convert the hex parts to decimal values and
   // return an RGB object
   return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
   }
}

export function rgbToHsl({ r, g, b }: rgb): hsl {
   ;(r /= 255), (g /= 255), (b /= 255)

   var max = Math.max(r, g, b),
      min = Math.min(r, g, b)
   var h,
      s,
      l = (max + min) / 2

   if (max == min) {
      h = s = 0 // achromatic
   } else {
      var d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
         case g:
            h = (b - r) / d + 2
            break
         case b:
            h = (r - g) / d + 4
            break
      }
      if (!h) return { h: 0, s: +s.toFixed(2), l: +l.toFixed(2) }
      // h /= 6
   }

   // Scale the hue value to the range [0, 360] and return an
   // HSL object
   return {
      h: Math.round(h * 60),
      s: s,
      l: l,
   }
}

export function hslToRgb({ h, s, l }: hsl): rgb {
   const k: (n: any) => number = n => (n + h / 30) % 12
   const a = s * Math.min(l, 1 - l)
   const f: (n: any) => number = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

   return {
      r: +(255 * f(0)).toFixed(0),
      g: +(255 * f(8)).toFixed(0),
      b: +(255 * f(4)).toFixed(0),
   }
}

export function rgbToHsv({ r, g, b }: rgb): hsv {
   const rabs = r / 255
   const gabs = g / 255
   const babs = b / 255
   const v = Math.max(rabs, gabs, babs)
   const diff = v - Math.min(rabs, gabs, babs)
   const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2
   const percentRoundFn = (num: number) => Math.round(num * 100) / 100

   let h = 0
   let s = 0

   if (diff !== 0) {
      s = diff / v
      const rr = diffc(rabs)
      const gg = diffc(gabs)
      const bb = diffc(babs)

      if (rabs === v) {
         h = bb - gg
      } else if (gabs === v) {
         h = 1 / 3 + rr - bb
      } else if (babs === v) {
         h = 2 / 3 + gg - rr
      }
      if (h < 0) {
         h += 1
      } else if (h > 1) {
         h -= 1
      }
   }
   return {
      h: Math.round(h * 360),
      s: percentRoundFn(s),
      v: percentRoundFn(v),
   }
}

export function hsvToRgb({ h, s, v }: hsv): rgb {
   var r = 0,
      g = 0,
      b = 0

   var i = Math.floor(h * 6)
   var f = h * 6 - i
   var p = v * (1 - s)
   var q = v * (1 - f * s)
   var t = v * (1 - (1 - f) * s)

   switch (i % 6) {
      case 0:
         ;(r = v), (g = t), (b = p)
         break
      case 1:
         ;(r = q), (g = v), (b = p)
         break
      case 2:
         ;(r = p), (g = v), (b = t)
         break
      case 3:
         ;(r = p), (g = q), (b = v)
         break
      case 4:
         ;(r = t), (g = p), (b = v)
         break
      case 5:
         ;(r = v), (g = p), (b = q)
         break
   }

   return { r: r * 255, g: g * 255, b: b * 255 }
}

function _hueToRgbVal(p: number, q: number, t: number): number {
   // A helper function to calculate the
   // red, green, or blue value from the hue
   if (t < 0) t += 1
   if (t > 1) t -= 1
   if (t < 1 / 6) return p + (q - p) * 6 * t
   if (t < 1 / 2) return q
   if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
   return p
}
