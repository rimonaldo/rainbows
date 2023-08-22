import { PaletteColorType, MiniPaletteColorType, PaletteColorRole, PaletteColorStyle } from '../types'
import { Shader } from './Shade.service'
import { ColorType, MiniPaletteColorShadeType, PaletteColorShadeType, CustomStyleType } from '../types'
import { hex, rgb, hsl, hsv, ColorStyleRangeType } from '../types'
import { Color } from './color.service'
import { getRandomAAColor } from 'accessible-colors'
import { utilService } from './util.service'
import { keys } from 'lodash'
import { paletteStyle } from './ColorStyle.service'

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
   styleRange: ColorStyleRangeType
   customStyles: CustomStyleType
   // activeStyle: CustomStyleType

   constructor({
      hex,
      rgb,
      hsl,
      hsv,
      role,
      style,
      customStyles,
   }: {
      hex?: hex
      rgb?: rgb
      hsl?: hsl
      hsv?: hsv
      role: PaletteColorRole
      style?: PaletteColorStyle
      customStyles?: CustomStyleType
   }) {
      super({ hex, rgb, hsl, hsv, role })
      this.color = new Color({ hex: this.hex })
      this.style = style || this.getStyleFromHsl(this.color.hsl)
      this.shade = new Shader(this.color)
      this.styleRange = paletteStyle[this.style]
      this.customStyles = { [this.style]: this.styleRange } || customStyles
      this.setStyles()
      console.log('customStyles', this.customStyles)
   }

   setStyles() {
      const styleNames = keys(paletteStyle)
      styleNames.forEach(styleName => {
         this.customStyles[styleName] = paletteStyle[styleName]
      })
   }

   addCustomStyle(style: CustomStyleType) {
      console.log('addCustomStyle', typeof style)

      this.customStyles[typeof style] = { ...style.style }
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

   genByStyle(newStyle: CustomStyleType) {
      console.log('genByStyle', newStyle)
      // this.style = keys(newStyle)[0] as PaletteColorStyle
      // const { h, s, l } = this.color.hsl
      // const { sat, lum } = newStyle[this.style]
      // const newSat = this.randomInRange(sat.min, sat.max)
      // const newLum = this.randomInRange(lum.min, lum.max)
      // const newHsl = { h, s: newSat, l: newLum }
      // this.color = new Color({ hsl: newHsl })
      // this.hex = this.color.hex
      // this.shade = new Shader(this.color)
      // this.styleRange = paletteStyle[this.style]
      // this.customStyles = { [this[].style]: this.styleRange }

      return this
   }

   addStyle(newStyle: CustomStyleType) {
      const styleName = keys(newStyle)[0]
      console.log('addStyle', styleName)
      this.styleRange = newStyle[styleName]

      this.customStyles[styleName] = { ...newStyle[styleName] }
      console.log('this.customStyles', this.customStyles)
   }

   _calculateHSL(randStyle: string, h: number) {
      const { s, l } = this._randSatLumByPaletteStyle(randStyle)
      return { h, s: +s.toFixed(2), l: +l.toFixed(2) }
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

export class PaletteColorFactory {
   static getEmptyPaletteColor(role: PaletteColorRole): PaletteColorType {
      return new PaletteColor({ role })
   }

   static getPaletteColorFromMiniPaletteColor(miniPaletteColor: MiniPaletteColorType): PaletteColorType {
      return new PaletteColor({ ...miniPaletteColor })
   }

   static getPaletteColorFromColor(color: ColorType, role: PaletteColorRole): PaletteColorType {
      return new PaletteColor({ ...color, role })
   }

   static getPaletteColorFromHex(hex: hex, role: PaletteColorRole): PaletteColorType {
      return new PaletteColor({ hex, role })
   }

   static getPaletteColorFromRgb(rgb: rgb, role: PaletteColorRole): PaletteColorType {
      return new PaletteColor({ rgb, role })
   }

   static getPaletteColorFromHsl(hsl: hsl, role: PaletteColorRole): PaletteColorType {
      return new PaletteColor({ hsl, role })
   }

   static getPaletteColorFromHsv(hsv: hsv, role: PaletteColorRole): PaletteColorType {
      return new PaletteColor({ hsv, role })
   }

   static getPaletteColorFromStyle(style: PaletteColorStyle, role: PaletteColorRole): PaletteColorType {
      return new PaletteColor({ style, role })
   }

   static getPaletteColorFromCustomStyle(customStyle: CustomStyleType, role: PaletteColorRole): PaletteColorType {
      return new PaletteColor({ customStyles: customStyle, role })
   }
}
