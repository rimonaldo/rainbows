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

   constructor({ hex, rgb, hsl, hsv, role }: { hex?: hex; rgb?: rgb; hsl?: hsl; hsv?: hsv; role: PaletteColorRole }) {
      super({ hex, rgb, hsl, hsv, role })
      this.color = new Color({ hex: this.hex })
      this.style = this.getStyleFromHsl(this.color.hsl)
      this.shade = new Shader(this.color)
   }

   private getStyleFromHsl(hsl: hsl): PaletteColorStyle {
      const { h, s, l } = hsl
      const { pastel, neon, earth, jewel } = paletteStyle

      if (s >= pastel.sat.min && s <= pastel.sat.max && l >= pastel.lum.min && l <= pastel.lum.max) return 'pastel'
      if (s >= neon.sat.min && s <= neon.sat.max && l >= neon.lum.min && l <= neon.lum.max) return 'neon'
      if (s >= earth.sat.min && s <= earth.sat.max && l >= earth.lum.min && l <= earth.lum.max) return 'earth'
      if (s >= jewel.sat.min && s <= jewel.sat.max && l >= jewel.lum.min && l <= jewel.lum.max) return 'jewel'
      return 'pastel'
   }

   setLock(lock: boolean) {
      this.isLocked = lock
      console.log('setLock', this.isLocked);
      
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
   pastel: {
      sat: { min: 0.2, max: 0.4 },
      lum: { min: 0.4, max: 0.6 },
   },
   neon: {
      sat: { min: 0.8, max: 1 },
      lum: { min: 0.8, max: 1 },
   },
   earth: {
      sat: { min: 0.2, max: 0.4 },
      lum: { min: 0, max: 0.2 },
   },
   jewel: {
      sat: { min: 0.8, max: 1 },
      lum: { min: 0.4, max: 0.6 },
   },
}
