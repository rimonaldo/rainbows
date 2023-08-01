import { MiniColorType, ColorType, MiniPaletteColorShadeType, PaletteColorShadeType } from './'

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
