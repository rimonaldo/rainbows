import { MiniColorType, ColorType } from '../types/Color'
import { hex, rgb, hsl, hsv } from '../types/Color'
import { GetColorName } from 'hex-color-to-color-name'

export class ColorPrototype implements MiniColorType {
   hex: hex
   name: string
   constructor({ hex, rgb, hsl, hsv }: { hex?: hex; rgb?: rgb; hsl?: hsl; hsv?: hsv }) {
      if (hex) {
         this.hex = hex
      } else if (rgb) {
         this.hex = this.rgbToHex(rgb)
      } else if (hsl) {
         

         this.hex = this.hslToHex(hsl)
      } else if (hsv) {
         this.hex = this.hsvToHex(hsv)
      } else {
         this.hex = '#000000'
      }
      this.name = GetColorName(this.hex)
   }

   protected hslToHex(hsl: hsl): hex {
      const rgb = this.hslToRgb(hsl)
      return this.rgbToHex(rgb)
   }

   protected hsvToHex(hsv: hsv): hex {
      const rgb = this.hsvToRgb(hsv)
      return this.rgbToHex(rgb)
   }

   protected hexToRgb(hex: hex): rgb {
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

   protected rgbToHsl(rgb: rgb): hsl {
      let { r, g, b } = rgb
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

   protected rgbToHsv(rgb: rgb): hsv {
      const { r, g, b } = rgb
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

   protected hslToRgb(hsl: hsl): rgb {
      const { h, s, l } = hsl
      const k: (n: any) => number = n => (n + h / 30) % 12
      const a = s * Math.min(l, 1 - l)
      const f: (n: any) => number = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

      return {
         r: +(255 * f(0)).toFixed(0),
         g: +(255 * f(8)).toFixed(0),
         b: +(255 * f(4)).toFixed(0),
      }
   }

   protected hsvToRgb({ h, s, v }: hsv): rgb {
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

   protected rgbToHex({ r, g, b }: rgb): hex {
      return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
   }
}

export class Color extends ColorPrototype implements ColorType {
   rgb: rgb
   hsl: hsl
   hsv: hsv

   constructor({ hex, rgb, hsl, hsv }: { hex?: hex; rgb?: rgb; hsl?: hsl; hsv?: hsv }) {
      if (hex) {
         super({ hex })
      } else if (rgb) {
         super({ rgb })
         this.rgb = rgb
      } else if (hsl) {
         super({ hsl })
      } else if (hsv) {
         super({ hsv })
      } else {
         super({ hex: '#000000' })
      }
      this.rgb = this.hexToRgb(this.hex)
      this.hsl = this.rgbToHsl(this.rgb)
      this.hsv = this.rgbToHsv(this.rgb)
   }

   getMiniColor(): MiniColorType {
      return new ColorPrototype({ hex: this.hex })
   }
}

export const colorService = {
   getNewColor: ({ hex, rgb, hsl, hsv }: { hex: hex; rgb: rgb; hsl: hsl; hsv: hsv }) => {
      if (hex) {
         return new Color({ hex })
      } else if (rgb) {
         return new Color({ rgb })
      } else if (hsl) {
         return new Color({ hsl })
      } else if (hsv) {
         return new Color({ hsv })
      }
   },
   getMiniColor: (color: ColorType) => color.getMiniColor(),
   asyncGetColor: async ({ hex, rgb, hsl, hsv }: { hex: hex; rgb: rgb; hsl: hsl; hsv: hsv }): Promise<ColorType> => {
      let color: ColorType
      if (hex) {
         color = new Color({ hex })
      } else if (rgb) {
         color = new Color({ rgb })
      } else if (hsl) {
         color = new Color({ hsl })
      } else if (hsv) {
         color = new Color({ hsv })
      }
      return new Promise((resolve, reject) => {
         resolve(color)
      })
   },
   asyncGetMiniColor: async (color: ColorType): Promise<MiniColorType> => {
      const miniColor = color.getMiniColor()
      return new Promise((resolve, reject) => {
         resolve(miniColor)
      })
   },
}
