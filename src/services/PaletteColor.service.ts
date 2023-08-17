import { PaletteColorType, MiniPaletteColorType, PaletteColorRole, PaletteColorStyle } from '../types/PaletteColor'
import { Shader } from './Shade.service'
import { ColorType, MiniPaletteColorShadeType, PaletteColorShadeType } from '../types'
import { hex, rgb, hsl, hsv } from '../types'
import { Color } from './color.service'
import { getRandomAAColor } from 'accessible-colors'
import { utilService } from './util.service'

export class MiniPaletteColor implements MiniPaletteColorType {
   _id: string
   role: PaletteColorRole
   hex: string
   name: string
   shade: MiniPaletteColorShadeType

   constructor({ hex, rgb, hsl, hsv, role }: { hex?: hex; rgb?: rgb; hsl?: hsl; hsv?: hsv; role: PaletteColorRole }) {
      let newColor
      if (hex) {
         newColor = new Color({ hex })
      } else if (rgb) {
         newColor = new Color({ rgb })
      } else if (hsl) {

         newColor = new Color({ hsl })
      } else if (hsv) {
         newColor = new Color({ hsv })
      } else {
         newColor = new Color({ hex: utilService.getRandomHex() })
      }
      this._id = ''
      this.role = role
      this.hex = newColor.hex
      this.name = newColor.name
      this.shade = new Shader(newColor).getMiniShader()
   }
}

export class PaletteColor extends MiniPaletteColor implements PaletteColorType {
   color: ColorType
   style: PaletteColorStyle
   shade: PaletteColorShadeType
   isLocked: boolean = false

   constructor({
      hex,
      rgb,
      hsl,
      hsv,
      role,
      style,
   }: {
      hex?: hex
      rgb?: rgb
      hsl?: hsl
      hsv?: hsv
      role: PaletteColorRole
      style?: PaletteColorStyle
   }) {
      super({ hex, rgb, hsl, hsv, role })
      this.color = new Color({ hex: this.hex })
      this.style = style || this.getStyleFromHsl(this.color.hsl)
      this.shade = new Shader(this.color)
   }

   private isInRange(num: number, min: number, max: number): boolean {
      return num >= min && num <= max
   }

   private getStyleFromHsl(hsl: hsl): PaletteColorStyle {
      let { h, s, l } = hsl

      const { pastel, neon, earth, jewel } = paletteStyle
      // console.log('s:', s, 'l:', l)
      // console.log('pastel s min:', pastel.sat.min, 'pastel s max:', pastel.sat.max)
      // console.log('pastel l min:', pastel.lum.min, 'pastel l max:', pastel.lum.max)

      if (s >= pastel.sat.min && s <= pastel.sat.max) {
         // console.log('pastel sat', s, pastel.sat.min)
         if (l >= pastel.lum.min && l <= pastel.lum.max) {
            // console.log('pastel lum')
            return 'pastel'
         }
      }
      if (s >= neon.sat.min && s <= neon.sat.max) {
         // console.log('neon sat', s, neon.sat.min)
         if (l >= neon.lum.min && l <= neon.lum.max) {
            // console.log('neon lum')
            return 'neon'
         }
      }
      if (s >= earth.sat.min && s <= earth.sat.max) {
         // console.log('earth sat', s, earth.sat.min)
         if (l >= earth.lum.min && l <= earth.lum.max) {
            // console.log('earth lum')
            return 'earth'
         }
      }
      if (s >= jewel.sat.min && s <= jewel.sat.max) {
         // console.log('jewel sat', s, jewel.sat.min)
         if (l >= jewel.lum.min && l <= jewel.lum.max) {
            // console.log('jewel lum')
            return 'jewel'
         }
      }

      // console.log('non found')
      return 'pastel'
   }

   genByStyle(style: PaletteColorStyle) {
      return new PaletteColor({ role: this.role, hsl: this._calculateHSL(style, this.color.hsl.h), style })
   }

   _calculateHSL(randStyle: string, h: number) {
      const { s, l } = this._randSatLumByPaletteStyle(randStyle)
      return { h, s, l }
   }

   randomInRange = (min: number, max: number, toFixed?: number) => {
      if (toFixed) return +(Math.random() * (max - min) + min).toFixed(toFixed)
      return +Math.random() * (max - min) + min
   }
   private _randSatLumByPaletteStyle = (colorStyleKey: keyof typeof paletteStyle) => {
      const { sat, lum } = paletteStyle[colorStyleKey]
      const randSat = +this.randomInRange(sat.min, sat.max)
      const randLum = this.randomInRange(lum.min, lum.max)
  
      return { s: randSat, l: randLum }
   }

   setLock(lock: boolean) {
      this.isLocked = lock
      console.log('setLock', this.isLocked)
   }

   getMiniPaletteColor(): MiniPaletteColorType {
      return {
         _id: this._id,
         role: this.role,
         hex: this.hex,
         name: this.name,
         shade: this.shade.getMiniShader(),
      }
   }
}

type ColorStyleRangeType = {
   sat: { min: number; max: number }
   lum: { min: number; max: number }
}

const paletteStyle: { [key: string]: ColorStyleRangeType } = {
   pastel: { sat: { min: 0.3, max: 0.45 }, lum: { min: 0.8, max: 0.9 } },
   // neutral: { sat: { min: 0.05, max: 0.15 }, lum: { min: 0.75, max: 0.9 } },
   neon: { sat: { min: 0.95, max: 1 }, lum: { min: 0.6, max: 0.7 } },
   earth: { sat: { min: 0.2, max: 0.35 }, lum: { min: 0.2, max: 0.4 } },
   jewel: { sat: { min: 0.5, max: 0.65 }, lum: { min: 0.5, max: 0.7 } },
}
