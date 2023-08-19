import { MiniColorType, ColorType, MiniPaletteColorShadeType, PaletteColorShadeType, hsl } from './'
import { StylerType } from './'
export interface MiniPaletteColorType extends MiniColorType {
   _id: string
   role: PaletteColorRole
   shade: MiniPaletteColorShadeType
}

type ColorStyleRangeType = {
   sat: { min: number; max: number }
   lum: { min: number; max: number }
}

// export interface CustomColorStyleType {
//    [key: string]: ColorStyleRangeType
// }

export interface PaletteColorType extends MiniPaletteColorType {
   color: ColorType
   style: PaletteColorStyle // neon, pastel, earth, jewel (or custom)
   shade: PaletteColorShadeType
   customStyles: StylerType
   isLocked: boolean
   styleRange: ColorStyleRangeType
   setLock: (lock: boolean) => void
   genByStyle: (style: PaletteColorStyle) => PaletteColorType
   addStyle:(style: StylerType) => void
}

export type PaletteColorStyle = 'neon' | 'pastel' | 'earth' | 'jewel'

export type PaletteColorRole =
   | 'primary'
   | 'secondary'
   | 'tertiary'
   | 'warning'
   | 'success'
   | 'info'
   | 'danger'
   | 'neutral'
   | 'neutralBright'
   | 'neutralDark'

// export class CustomStyle implements CustomColorStyleType {
//    [key: string]: ColorStyleRangeType

//    constructor({
//       name,
//       sat,
//       lum,
//    }: {
//       name: string
//       sat: { min: number; max: number }
//       lum: { min: number; max: number }
//    }) {
//       this[name] = { sat, lum }
//    }
// }
