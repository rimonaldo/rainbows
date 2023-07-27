import { map } from 'lodash'
import { PaletteColorRole, PaletteColorType, PaletteType } from '../services/palette'
import { GetColorName } from 'hex-color-to-color-name'
export interface MiniShadeType {
   hex: string
}

export interface MiniPaletteColorType {
   role: PaletteColorRole
   hex: string
   name: string
   shade: MiniColorShadeType
}

export class MiniPaletteColor implements MiniPaletteColorType {
   role: PaletteColorRole
   hex: string
   name: string
   shade: MiniColorShadeType

   constructor(paletteColor: PaletteColorType) {
      this.role = paletteColor.role as PaletteColorRole
      this.hex = paletteColor.color.hex
      this.name = paletteColor.name
      this.shade = {
         [100]: { hex: paletteColor.shade[100].hex },
         [200]: { hex: paletteColor.shade[200].hex },
         [300]: { hex: paletteColor.shade[300].hex },
         [400]: { hex: paletteColor.shade[400].hex },
         [500]: { hex: paletteColor.shade[500].hex },
         [600]: { hex: paletteColor.shade[600].hex },
         [700]: { hex: paletteColor.shade[700].hex },
         [800]: { hex: paletteColor.shade[800].hex },
         [900]: { hex: paletteColor.shade[900].hex },
      }
   }
}

export interface MiniPaletteType {
   _id?: string
   primary: MiniPaletteColorType
   secondary: MiniPaletteColorType
   tertiary: MiniPaletteColorType
   info: MiniPaletteColorType
   success: MiniPaletteColorType
   warning: MiniPaletteColorType
   danger: MiniPaletteColorType
   neutral: MiniPaletteColorType
}

export type MiniColorType = {
   hex: string
}

export interface MiniColorShadeType {
   [key: number]: MiniColorType
}

export class MiniPalette implements MiniPaletteType {
   _id?: string
   primary: MiniPaletteColorType
   secondary: MiniPaletteColorType
   tertiary: MiniPaletteColorType
   info: MiniPaletteColorType
   success: MiniPaletteColorType
   warning: MiniPaletteColorType
   danger: MiniPaletteColorType
   neutral: MiniPaletteColorType

   constructor(palette: PaletteType) {
      this.primary = new MiniPaletteColor(palette.primary)
      this.secondary = new MiniPaletteColor(palette.secondary)
      this.tertiary = new MiniPaletteColor(palette.tertiary)
      this.info = new MiniPaletteColor(palette.info)
      this.success = new MiniPaletteColor(palette.success)
      this.warning = new MiniPaletteColor(palette.warning)
      this.danger = new MiniPaletteColor(palette.danger)
      this.neutral = new MiniPaletteColor(palette.neutral)
   }
}
