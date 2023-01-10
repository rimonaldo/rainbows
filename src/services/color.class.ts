import { ColorType } from '../types/color'
import { hex, rgb, hsl, hsv } from '../types/colorTypes'

export class Color implements ColorType {
   hex: string
   rgb: rgb
   hsl: hsl
   hsv: hsv

   public constructor(hex?: hex, rgb?: rgb, hsl?: hsl, hsv?: hsv) {
      this.hex = hex || this.rgbToHex(rgb || { r: 255, g: 255, b: 255 }) || '#ffffff'
      this.rgb = this.hexToRgb(hex || '') || rgb || { r: 255, g: 255, b: 255 }
      this.hsl = hsl || this.rgbToHsl(this.rgb)
      this.hsv = hsv || this.rgbToHsv(this.rgb)
   }

   hexToRgb(hex: hex): rgb {
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

   rgbToHsl({ r, g, b }: rgb): hsl {
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
         if (!h) return { h: 0, s, l }
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

   rgbToHsv({ r, g, b }: rgb): hsv {
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

   hslToRgb({ h, s, l }: hsl): rgb {
      // Initialize the red, green, and blue values to zero
      let r = 0
      let g = 0
      let b = 0

      // If the saturation is zero,
      // the color is gray and all the color values
      // are equal to the lightness
      if (s === 0) {
         r = g = b = l
      } else {
         // Calculate temporary values for
         // red, green, and blue channels
         const q = l < 0.5 ? l * (1 + s) : l + s - l * s
         const p = 2 * l - q

         // Calculate the red, green, and blue values
         // using the hue value
         r = this._hueToRgbVal(p, q, h + 1 / 3)
         g = this._hueToRgbVal(p, q, h)
         b = this._hueToRgbVal(p, q, h - 1 / 3)
      }

      // Scale the red, green, and blue values to the range [0, 255] and return an RGB object
      return {
         r: r * 255,
         g: g * 255,
         b: b * 255,
      }
   }

   hsvToRgb({ h, s, v }: hsv): rgb {
      // Initialize the red, green, and blue values to zero
      let r = 0
      let g = 0
      let b = 0

      // Calculate the temporary values for the red, green, and blue channels
      const i = Math.floor(h * 6)
      const f = h * 6 - i
      const p = v * (1 - s)
      const q = v * (1 - f * s)
      const t = v * (1 - (1 - f) * s)

      // Calculate the red, green, and blue values using the hue value
      switch (i % 6) {
         case 0:
            r = v
            g = t
            b = p
            break
         case 1:
            r = q
            g = v
            b = p
            break
         case 2:
            r = p
            g = v
            b = t
            break
         case 3:
            r = p
            g = q
            b = v
            break
         case 4:
            r = t
            g = p
            b = v
            break
         case 5:
            r = v
            g = p
            b = q
            break
      }

      // Scale the red, green, and blue values to the range [0, 255] and return an RGB object
      return {
         r: r * 255,
         g: g * 255,
         b: b * 255,
      }
   }

   rgbToHex({ r, g, b }: rgb): hex {
      return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
   }

   // Helper functions
   _normalize({ r, g, b }: rgb): rgb {
      return {
         r: (r /= 255),
         g: (g /= 255),
         b: (b /= 255),
      }
   }

   _hueToRgbVal(p: number, q: number, t: number): number {
      // A helper function to calculate the
      // red, green, or blue value from the hue
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
   }
}
