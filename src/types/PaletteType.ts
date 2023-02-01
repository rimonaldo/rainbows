import { ColorType } from './ColorType'
import { Color } from '../services/color.class'
export const enum PaletteModel {
   Jewl = 'jewl',
   Earth = 'earth',
   Pastel = 'pastel',
   Neon = 'neon',
}

export interface PaletteType {
   title: string
   colors: ColorType[]
   primary: ColorType
   secondary: ColorType
   neutral: ColorType
   info: ColorType
   warning: ColorType
   error: ColorType
   success: ColorType
}

export enum PaletteColorTitle {
   Primary = 'primary',
   Secondary = 'secondary',
   Neutral = 'neutral',
   Info = 'info',
   Warning = 'warning',
   Error = 'error',
   Success = 'success',
}

export class Palette implements PaletteType {
   title: string
   colors: ColorType[]
   primary: ColorType = new Color({})
   secondary: ColorType = new Color({})
   neutral: ColorType = new Color({})
   info: ColorType = new Color({})
   warning: ColorType = new Color({})
   error: ColorType = new Color({})
   success: ColorType = new Color({})

   constructor({ title, colors, primary }: { title?: string; colors?: ColorType[]; primary?: ColorType }) {
      this.title = title || 'Untitled'
      this.colors = colors || []
      this.primary = primary || new Color({})
      this.secondary = new Color({})
   }
}
