import { ColorType } from '../types/color'
import { hex, rgb, hsl, hsv } from '../types/colorTypes'

export class Color implements ColorType {
   hex: string
   rgb: rgb
   hsl: hsl
   hsv: hsv

   constructor(hex: hex) {
      this.hex = hex
      this.rgb = this.hexToRgb(hex)
      this.hsl = this.rgbToHsl(this.rgb)
      this.hsv = this.rgbToHsv(this.rgb)
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
      // Normalize the RGB values to the range [0, 1]
      r /= 255
      g /= 255
      b /= 255

      // Find the maximum and minimum values of the RGB components
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)

      // Initialize the hue, saturation, and lightness values to zero
      let h = 0
      let s = 0
      let l = 0

      // If the maximum and minimum values are the same, the color is gray
      // and the hue, saturation, and lightness values are undefined
      if (max === min) {
         l = max
      } else {
         // Calculate the lightness value
         l = (max + min) / 2
         // Calculate the saturation value
         s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)
         // Calculate the hue value
         switch (max) {
            case r:
               h = (g - b) / (max - min)
               break
            case g:
               h = 2 + (b - r) / (max - min)
               break
            case b:
               h = 4 + (r - g) / (max - min)
               break
         }
      }

      // Scale the hue value to the range [0, 360] and return an
      // HSL object
      return {
         h: h * 60,
         s: s,
         l: l,
      }
   }

   rgbToHsv({ r, g, b }: rgb): hsv {
      // Normalize the RGB values to the range [0, 1]
      r /= 255
      g /= 255
      b /= 255

      // Find the maximum and minimum values of the RGB components
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)

      // Initialize the hue, saturation, and value variables to zero
      let h = 0
      let s = 0
      let v = 0

      // Calculate the value
      v = max

      // If the maximum and minimum values are the same, the color is gray
      // and the hue and saturation values are undefined
      if (max === min) {
         h = 0
         s = 0
      } else {
         // Calculate the saturation
         s = (max - min) / max

         // Calculate the hue
         switch (max) {
            case r:
               h = (g - b) / (max - min)
               break
            case g:
               h = 2 + (b - r) / (max - min)
               break
            case b:
               h = 4 + (r - g) / (max - min)
               break
         }
      }

      // Scale the hue value to the range [0, 360] and return an HSV object
      return {
         h: h * 60,
         s: s,
         v: v,
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