import { ColorType } from '../types/color'
import { hex, rgb, hsl, hsv } from '../types/colorTypes'
import { hexToRgb, rgbToHsv, rgbToHsl, hslToRgb, rgbToHex } from '.././services/colorService'
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
      return hexToRgb(hex)
   }

   rgbToHsl(rgb: rgb): hsl {
      return rgbToHsl(rgb)
   }

   rgbToHsv(rgb: rgb): hsv {
      return rgbToHsv(rgb)
   }

   hslToRgb(hsl: hsl): rgb {
      return hslToRgb(hsl)
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

   rgbToHex(rgb: rgb): hex {
      return rgbToHex(rgb)
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
