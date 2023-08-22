export type hex = string
export type rgb = { r: number; g: number; b: number; a?: number }
export type hsl = { h: number; s: number; l: number; a?: number }
export type hsv = { h: number; s: number; v: number; a?: number }

export interface MiniColorType {
   hex: hex
   name: string
}

export interface ColorType extends MiniColorType {
   rgb: rgb
   hsl: hsl
   hsv: hsv

   getMiniColor(): MiniColorType
   setValue({ hex, hsl, hsv, rgb }: { hsl?: hsl; rgb?: rgb; hsv?: hsv; hex?: hex }): void
}
