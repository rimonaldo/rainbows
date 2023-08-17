import { MiniColorType, ColorType, MiniPaletteColorShadeType, PaletteColorShadeType, hsl } from './'

export interface MiniPaletteColorType extends MiniColorType {
   _id: string
   role: PaletteColorRole
   shade: MiniPaletteColorShadeType
}

export interface PaletteColorType extends MiniPaletteColorType {
   color: ColorType
   style: PaletteColorStyle
   shade: PaletteColorShadeType
   isLocked: boolean
   setLock: (lock: boolean) => void
   genByStyle: (style: PaletteColorStyle) => PaletteColorType
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
