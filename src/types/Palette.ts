import { PaletteColorType, PaletteColorRole } from './PaletteColor'
import { ColorStyleType, MiniPaletteColorType } from './'
import { PaletteColorShadeType, MiniPaletteColorShadeType } from './Shade'
import { guid } from '../services/utils'

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
   _id: string
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
   _id: string
   primary: PaletteColorType
   secondary: PaletteColorType
   tertiary: PaletteColorType
   info: PaletteColorType
   success: PaletteColorType
   warning: PaletteColorType
   danger: PaletteColorType
   neutral: PaletteColorType
   neutralBright: PaletteColorType
   neutralDark: PaletteColorType
   templates: TemplateType[]
   template: TemplateType

   genBrandColors: (temp: 1 | 2 | 3, fluidity: 1 | 2 | 3, template?:TemplateType) => void
   addTemplate: (template: TemplateType) => void
   setActiveTemplate: (template: TemplateType) => void
   genSemanticColors: () => void
   genNeutralColors: () => void
   getMiniPalette: () => MiniPaletteType
   setColor: (paletteColor: PaletteColorType) => void
   setColorLock: (role: PaletteColorRole, lock: boolean) => void
   getRandomTemplate: (length:number) => TemplateType
}

export interface TemplateType {
   name: string
   primary: string
   secondary: string
   tertiary: string
}

export type MiniColorType = {
   hex: string
}

export class MiniPalette implements MiniPaletteType {
   _id: string
   primary: MiniPaletteColorType
   secondary: MiniPaletteColorType
   tertiary: MiniPaletteColorType
   info: MiniPaletteColorType
   success: MiniPaletteColorType
   warning: MiniPaletteColorType
   danger: MiniPaletteColorType
   neutral: MiniPaletteColorType

   constructor(palette: PaletteType) {
      this._id = guid()
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

export enum HarmonyTitle {
   Monochromatic = 'monochromatic',
   Triadic = 'triadic',
   Complementary = 'complementary',
   Analogous = 'analogous',
}
