import { ColorType, MiniColorType, hsl,rgb,hex,hsv } from './type'
import { hexToRgb, rgbToHsv, rgbToHsl, hslToRgb, rgbToHex } from './utils'



export class Color implements ColorType {
   hex: string
   rgb: rgb
   hsl: hsl
   hsv: hsv

   public constructor({ hex, rgb, hsl, hsv }: { hex?: hex; rgb?: rgb; hsl?: hsl; hsv?: hsv }) {
      // initialize the color

      if (hex) {
         this.hex = hex
         this.rgb = this.hexToRgb(hex)
         this.hsl = this.rgbToHsl(this.rgb)
         this.hsv = this.rgbToHsv(this.rgb)
      } else if (rgb) {
         this.rgb = rgb
         this.hex = this.rgbToHex(rgb)
         this.hsl = this.rgbToHsl(rgb)
         this.hsv = this.rgbToHsv(rgb)
      } else if (hsl) {
         this.hsl = hsl
         this.rgb = this.hslToRgb(hsl)
         this.hex = this.rgbToHex(this.rgb)
         this.hsv = this.rgbToHsv(this.rgb)
      } else if (hsv) {
         this.hsv = hsv
         this.rgb = this.hsvToRgb(hsv)
         this.hsl = this.rgbToHsl(this.rgb)
         this.hex = this.rgbToHex(this.rgb)
      } else {
         this.hex = '#ffffff'
         this.rgb = { r: 255, g: 255, b: 255 }
         this.hsl = { h: 0, s: 0, l: 1 }
         this.hsv = { h: 0, s: 0, v: 1 }
      }
   }

   complement(): Color {
      const { h, s, l } = this.hsl
      return new Color({ hsl: { h: (h + 180) % 360, s, l } })
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

   getTriadHsls(): hsl[] {
      const triadHues = [this.hsl.h, (this.hsl.h + 120) % 360, (this.hsl.h + 240) % 360]
      return triadHues.map(hue => {
         return { h: hue, s: this.hsl.s, l: this.hsl.l }
      })
   }

   getCompHsls(): hsl[] {
      const { h, s, l } = this.hsl
      return [this.hsl, { h: (h + 180) % 360, s, l }]
   }

   getMonoHsls(): hsl[] {
      const { h, s, l } = this.hsl
      let color1 = { h, s, l: l >= 0.9 ? 1 : l + 0.1 }
      let color2 = { h, s, l: l >= 0.9 ? 1 : l + 0.05 }
      let color3 = { h, s, l: l >= 0.95 ? 1 : l + 0.025 }
      let color5 = { h, s, l: l <= 0.02 ? 0 : l - 0.025 }
      let color6 = { h, s: s, l: l <= 0.02 ? 0 : l - 0.05 }
      let color7 = { h, s: s, l: l <= 0.1 ? 0 : l - 0.1 }
      return [color1, color2, color3, this.hsl, color5, color6, color7]
   }

   getAnalogHsls(): hsl[] {
      const { h, s, l } = this.hsl
      const analogousColors = []
      const angle = 30
      // generate the three analogous colors by rotating the hue by +- 30 degrees
      for (let i = -1; i <= 1; i++) {
         analogousColors.push({ h: +(h + angle * i + 360) % 360, s, l })
      }

      return [analogousColors[1], analogousColors[0], analogousColors[2]]
   }

   splitHsl(): hsl
   splitHsl(hsl: hsl): hsl[]
   splitHsl(hsl?: unknown): import('./type').hsl | import('./type').hsl[] {
      if (hsl) {
         const { h, s, l } = hsl as hsl
         return [
            { h: (h + 30) % 360, s, l },
            { h: (h + 180) % 360, s, l },
            { h: (h + 210) % 360, s, l },
         ]
      } else {
         return this.splitHsl(this.hsl)
      }
   }

   getTriadHsvs(): hsv[] {
      const triadHues = [this.hsl.h, (this.hsl.h + 120) % 360, (this.hsl.h + 240) % 360]
      return triadHues.map(hue => {
         return { h: hue, s: this.hsv.s, v: this.hsv.v }
      })
      // return [this.hsv]
   }
   getCompHsvs(): hsv[] {
      return [this.hsv]
   }
   getMonoHsvs(): hsv[] {
      return [this.hsv]
   }
   getAnalogHsvs(): hsv[] {
      return [this.hsv]
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

export class MiniColor implements MiniColorType {
   hex: hex
   rgb: rgb
   hsl: hsl
   hsv: hsv

   public constructor({ hex, rgb, hsl, hsv }: { hex?: hex; rgb?: rgb; hsl?: hsl; hsv?: hsv }) {
      // initialize the color

      if (hex) {
         this.hex = hex
         this.rgb = this.hexToRgb(hex)
         this.hsl = this.rgbToHsl(this.rgb)
         this.hsv = this.rgbToHsv(this.rgb)
      } else if (rgb) {
         this.rgb = rgb
         this.hex = this.rgbToHex(rgb)
         this.hsl = this.rgbToHsl(rgb)
         this.hsv = this.rgbToHsv(rgb)
      } else if (hsl) {
         this.hsl = hsl
         this.rgb = this.hslToRgb(hsl)
         this.hex = this.rgbToHex(this.rgb)
         this.hsv = this.rgbToHsv(this.rgb)
      } else if (hsv) {
         this.hsv = hsv
         this.rgb = this.hsvToRgb(hsv)
         this.hsl = this.rgbToHsl(this.rgb)
         this.hex = this.rgbToHex(this.rgb)
      } else {
         this.hex = '#ffffff'
         this.rgb = { r: 255, g: 255, b: 255 }
         this.hsl = { h: 0, s: 0, l: 1 }
         this.hsv = { h: 0, s: 0, v: 1 }
      }
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
}
