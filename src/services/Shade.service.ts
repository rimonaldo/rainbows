import { PaletteColorShadeType, MiniPaletteColorShadeType } from '../types'
import { ColorType } from '../types/Color'
import { colorService, Color } from './color.service'

export class Shader implements PaletteColorShadeType {
   [key: number]: ColorType

   constructor(color: ColorType) {
      this[500] = color
      this.genShades()
   }

   genShades = () => {
      this[100] = this.genShade100()
      this[900] = this.genShade900(0.2,0.3)

      this[300] = this.genMidShade(this[100], this[500])
      this[200] = this.genMidShade(this[100], this[300])
      this[400] = this.genMidShade(this[300], this[500])

      this[700] = this.genMidShade(this[500], this[900])
      this[800] = this.genMidShade(this[700], this[900])
      this[600] = this.genMidShade(this[500], this[700])
   }

   private genShade100 = () => {
      const initialHue = this[500].hsl.h
      const randomSat = this._randomNumInRange(0.1, 0.2)
      const randomLum = this._randomNumInRange(0.95, 0.97)
      const shade100Hsl = { h: initialHue, s: randomSat, l: randomLum }
      return new Color({ hsl: shade100Hsl })
   }

   private genShade900 = (maxSat?:number , maxLum?:number) => {
      const initialHue = this[500].hsl.h
      const sat = this._randomNumInRange(0, maxSat || 0.2)
      const lum = this._randomNumInRange(0, maxLum || 0.2)
      const shade900Hsl = { h: initialHue, s: sat, l: lum }
      return new Color({ hsl: shade900Hsl })
   }

   private genMidShade = (shade1: ColorType, shade2: ColorType) => {
      const initialHue = this[500].hsl.h
      const hsl1 = shade1.hsl
      const hsl2 = shade2.hsl
      const midS = (hsl1.s + hsl2.s) / 2
      const midL = (hsl1.l + hsl2.l) / 2
      const newHsl = { h: initialHue, s: midS, l: midL }
      return new Color({ hsl: newHsl })
   }

   private _randomNumInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }

   public getMiniShader = (): MiniPaletteColorShadeType => {
      return {
         [100]: { hex: this[100].hex, name: this[100].name },
         [200]: { hex: this[200].hex, name: this[200].name },
         [300]: { hex: this[300].hex, name: this[300].name },
         [400]: { hex: this[400].hex, name: this[400].name },
         [500]: { hex: this[500].hex, name: this[500].name },
         [600]: { hex: this[600].hex, name: this[600].name },
         [700]: { hex: this[700].hex, name: this[700].name },
         [800]: { hex: this[800].hex, name: this[800].name },
         [900]: { hex: this[900].hex, name: this[900].name },
      }
   }
}

export const shadeService = {
   genShades: (color: ColorType) => {
      const shader = new Shader(color)
      return shader
   },
}
