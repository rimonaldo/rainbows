import { hsl } from "./Color";

export type ColorStyleRangeType = {
   sat: { min: number; max: number }
   lum: { min: number; max: number }
}

export interface CustomStyle {
   [key: string]: ColorStyleRangeType
}

