import { ColorStyleRangeType, StylerType } from '../types'

export class CustomStyler implements StylerType {
   [key: string]: ColorStyleRangeType

   constructor({
      name,
      sat,
      lum,
   }: {
      name: string
      sat: { min: number; max: number }
      lum: { min: number; max: number }
   }) {
      this[name] = { sat, lum }
   }
}

interface StyleType {
   name: string
   sat: { min: number; max: number }
   lum: { min: number; max: number }
}

export class CustomStyle implements StyleType {
   name: string
   sat: { min: number; max: number }
   lum: { min: number; max: number }

   constructor({ name, sat, lum }: StyleType) {
      this.name = name
      this.sat = sat
      this.lum = lum
   }
}

interface RuleType {
   name: string
   hueDistance: number
   fromHue: number
   offset: number
}

export class Rule implements RuleType {
   name: string
   hueDistance: number
   fromHue: number
   offset: number

   constructor({ name, hueDistance, fromHue, offset }: RuleType) {
      this.name = name
      this.hueDistance = hueDistance
      this.fromHue = fromHue
      this.offset = offset
   }

   getHue(directon: 'pos' | 'neg' = 'pos') {
      if (directon === 'pos') return this.fromHue + this.hueDistance + this.randomOffset()
      return this.fromHue - this.hueDistance + this.randomOffset()
   }

   private randInRange(min: number, max: number, toFixed?: number) {
      if (toFixed) return +(Math.random() * (max - min) + min).toFixed(toFixed)
      return +Math.random() * (max - min) + min
   }

   private randomOffset() {
      return this.randInRange(this.offset * -1, this.offset)
   }
}
