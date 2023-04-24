import { ColorType } from '../color/type'

export type ColorStyle = 'neon' | 'pastel' | 'earth' | 'jewel'

export interface ColorShadeType {
   [key: number]: ColorType
}

export interface PaletteColorType {
   role: string
   name: string
   shade: ColorShadeType
   isLocked: boolean
   color: ColorType
   setLock: () => void
}
export interface PaletteMetaDataType {
   creationTimeStamp: number
   temp: 'warm' | 'cool'
   paletteStyle: 'earth' | 'neon' | 'pastel' | 'jewel'
   theme: 'light' | 'dark'
   tags: string[]
}

export interface PaletteType {
   // colors: object
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
   generate: () => void
   genBrandColors: (temp: number, fluidity: number, style: 'neon' | 'pastel' | 'earth' | 'jewel') => void
   setPaletteColor: (color: PaletteColorType, role: PaletteColorRole) => void
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
