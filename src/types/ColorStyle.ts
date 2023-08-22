export type ColorStyleRangeType = {
   name: string
   sat: { min: number; max: number }
   lum: { min: number; max: number }
}

export interface CustomStyleType {
   [key: string]: ColorStyleRangeType
}



export type ColorStyleType = {
   name: string
   sat: { min: number; max: number }
   lum: { min: number; max: number }
}


export type PaletteColorStyle = 'neon' | 'pastel' | 'earth' | 'jewel' | string
