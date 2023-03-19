import { ColorType } from '../color/type'

// enum for numbers 100-900

export interface ColorShadeType {
   [key: number]: ColorType
}

export interface PaletteColorType {
   _id: string
   role: string
   shade: ColorShadeType
   hue: number   
}

export interface PaletteMetaDataType {
   creationTimeStamp: number
   temp: 'warm' | 'cool'
   paletteStyle: 'pastel' | 'earth' | 'jewl' | 'neon' | 'neutral'
   theme: 'light' | 'dark'
   tags: string[]
}

export interface PaletteType {
   title: string
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

export type PaletteColorRole  = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'info' | 'warning' | 'danger' | 'success'
