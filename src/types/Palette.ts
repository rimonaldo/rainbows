import { PaletteColorType, PaletteColorRole } from './PaletteColor'
import { MiniPaletteColorType } from './'
import { PaletteColorShadeType, MiniPaletteColorShadeType } from './Shade'

export class MiniPaletteColor implements MiniPaletteColorType {
   role: PaletteColorRole
   hex: string
   name: string
   shade: MiniPaletteColorShadeType
   _id: string
   constructor(paletteColor: PaletteColorType) {
      this._id = ''
      this.role = paletteColor.role 
      this.hex = paletteColor.color.hex
      this.name = paletteColor.name
      this.shade = {
         [100]: { hex: paletteColor.shade[100].hex, name: paletteColor.shade[100].name },
         [200]: { hex: paletteColor.shade[200].hex, name: paletteColor.shade[200].name },
         [300]: { hex: paletteColor.shade[300].hex, name: paletteColor.shade[300].name },
         [400]: { hex: paletteColor.shade[400].hex, name: paletteColor.shade[400].name },
         [500]: { hex: paletteColor.shade[500].hex, name: paletteColor.shade[500].name },
         [600]: { hex: paletteColor.shade[600].hex, name: paletteColor.shade[600].name },
         [700]: { hex: paletteColor.shade[700].hex, name: paletteColor.shade[700].name },
         [800]: { hex: paletteColor.shade[800].hex, name: paletteColor.shade[800].name },
         [900]: { hex: paletteColor.shade[900].hex, name: paletteColor.shade[900].name },
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

export interface PaletteType {
   primary: PaletteColorType
   secondary: PaletteColorType
   tertiary: PaletteColorType
   info: PaletteColorType
   success: PaletteColorType
   warning: PaletteColorType
   danger: PaletteColorType
   neutral: PaletteColorType

   genBrandColors: () => void
   genSemanticColors: () => void
   genNeutralColors: () => void
   getMiniPalette: () => MiniPaletteType
}

export type MiniColorType = {
   hex: string
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

   constructor(palette: PaletteType ) {
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
