import { ColorType, MiniColorType } from './'

export interface MiniPaletteColorShadeType {
   [key: number]: MiniColorType
}

export interface PaletteColorShadeType extends MiniPaletteColorShadeType {
   [key: number]: ColorType
   genShades: () => void
   getMiniShader: () => MiniPaletteColorShadeType
}
