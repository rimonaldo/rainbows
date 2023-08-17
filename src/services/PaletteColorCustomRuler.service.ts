export interface PaletteColorRulerType {
   title: string
   angle: number
   fromHue: number
   maxOffset: number

   getHue: (offset?: number) => number
}

export class PaletteColorRuler implements PaletteColorRulerType {
   title: string
   angle: number
   fromHue: number
   maxOffset: number

   constructor(title: string, angle: number, fromHue: number, maxOffset: number) {
      this.title = title
      this.angle = angle
      this.fromHue = fromHue
      this.maxOffset = maxOffset
   }

   getHue(offset: number = 0): number {
      return (this.fromHue + this.angle + offset) % 360
   }
}
