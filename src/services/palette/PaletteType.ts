import { ColorType } from '../../types'

export type ColorStyle = 'neon' | 'pastel' | 'earth' | 'jewel'

export interface ColorShadeType {
   [key: number]: ColorType
}

export interface PaletteColorType {
   role: string
   shade: ColorShadeType
   hue: number
   isLocked: boolean
   name: string
   color: ColorType
   setLock: (lock: boolean) => void
}

export interface PaletteMetaDataType {
   creationTimeStamp: number
   temp: 'warm' | 'cool'
   paletteStyle: 'earth' | 'neon' | 'pastel' | 'jewel'
   theme: 'light' | 'dark'
   tags: string[]
}

export interface PaletteType {
   primary: PaletteColorType
   secondary: PaletteColorType
   tertiary: PaletteColorType
   neutral: PaletteColorType
   info: PaletteColorType
   warning: PaletteColorType
   danger: PaletteColorType
   success: PaletteColorType
   metaData: PaletteMetaDataType
   theme: 'light' | 'dark'
}

export type PaletteColorRole =
   | 'primary'
   | 'secondary'
   | 'tertiary'
   | 'neutral'
   | 'info'
   | 'warning'
   | 'danger'
   | 'success'
