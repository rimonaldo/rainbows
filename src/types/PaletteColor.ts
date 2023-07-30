import { MiniColorType, ColorType, MiniPaletteColorShadeType, PaletteColorShadeType } from './'
import { hex, rgb, hsl, hsv } from './'

export type PaletteColorRole =
   | 'primary'
   | 'secondary'
   | 'tertiary'
   | 'warning'
   | 'success'
   | 'info'
   | 'danger'
   | 'neutral'

// export interface MiniColorShadeType {
//    [key: number]: MiniColorType
// }
// export interface ColorShadeType extends MiniColorShadeType {
//    genShades: () => void
// }

export interface MiniPaletteColorType extends MiniColorType {
   _id: string
   role: PaletteColorRole
   shade: MiniPaletteColorShadeType
}

export interface PaletteColorType extends MiniPaletteColorType {
   color: ColorType
   shade: PaletteColorShadeType
   isLocked: boolean
   setLock: (lock: boolean) => void
}
