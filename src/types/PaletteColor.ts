import { MiniColorType, ColorType, MiniPaletteColorShadeType, PaletteColorShadeType, hsl, ColorStyleType } from './'
import { CustomStyleType } from './'
import { ColorStyleRangeType, PaletteColorStyle } from './'
export interface MiniPaletteColorType extends MiniColorType {
   _id: string
   role: PaletteColorRole
   shade: MiniPaletteColorShadeType
}

export interface PaletteColorType extends MiniPaletteColorType {
   color: ColorType
   style: PaletteColorStyle // neon, pastel, earth, jewel (or custom)
   shade: PaletteColorShadeType
   customStyles: CustomStyleType
   isLocked: boolean
   // styleRange: ColorStyleRangeType
   activeStyle: ColorStyleType
   setLock: (lock: boolean) => void
   genByStyle: (style: ColorStyleType) => PaletteColorType
   addStyle: (style: ColorStyleType) => void
}

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

// export class CustomStyle implements CustomCustomStyleType {
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
