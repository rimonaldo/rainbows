import { ColorStyleRangeType, CustomStyleType } from '../types'

export class CustomStyle implements CustomStyleType {
   [key: string]: ColorStyleRangeType

   constructor({
      // name,
      sat,
      lum,
   }: {
      name: string
      sat: { min: number; max: number }
      lum: { min: number; max: number }
   }) {
      // this[name] = { sat, lum }
   }
}

export const paletteStyle: { [key: string]: ColorStyleRangeType } = {
   pastel: { name: 'pastel', sat: { min: 0.3, max: 0.45 }, lum: { min: 0.8, max: 0.9 } },
   neutral: { name: 'neutral', sat: { min: 0.05, max: 0.15 }, lum: { min: 0.75, max: 0.9 } },
   neon: { name: 'neon', sat: { min: 0.95, max: 1 }, lum: { min: 0.6, max: 0.7 } },
   earth: { name: 'earth', sat: { min: 0.2, max: 0.35 }, lum: { min: 0.2, max: 0.4 } },
   jewel: { name: 'jewel', sat: { min: 0.5, max: 0.65 }, lum: { min: 0.5, max: 0.7 } },
}

// export class CustomStyle implements StyleType {
//    name: string
//    sat: { min: number; max: number }
//    lum: { min: number; max: number }

//    constructor({ name, sat, lum }: StyleType) {
//       this.name = name
//       this.sat = sat
//       this.lum = lum
//    }
// }

// interface RuleType {
//    name: string
//    hueDistance: number
//    fromHue: number
//    offset: number
// }

// export class Rule implements RuleType {
//    name: string
//    hueDistance: number
//    fromHue: number
//    offset: number

//    constructor({ name, hueDistance, fromHue, offset }: RuleType) {
//       this.name = name
//       this.hueDistance = hueDistance
//       this.fromHue = fromHue
//       this.offset = offset
//    }

//    getHue(directon: 'pos' | 'neg' = 'pos') {
//       if (directon === 'pos') return this.fromHue + this.hueDistance + this.randomOffset()
//       return this.fromHue - this.hueDistance + this.randomOffset()
//    }

//    private randInRange(min: number, max: number, toFixed?: number) {
//       if (toFixed) return +(Math.random() * (max - min) + min).toFixed(toFixed)
//       return +Math.random() * (max - min) + min
//    }

//    private randomOffset() {
//       return this.randInRange(this.offset * -1, this.offset)
//    }
// }
