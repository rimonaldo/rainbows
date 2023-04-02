import { ColorType } from '../color/type'
import { Color, hsl } from '../color'
import { PaletteMetaDataType } from './PaletteType'
import { getRandomAAColor } from 'accessible-colors'
import { RgbColor } from 'contrast-ratio'
import ratio from 'contrast-ratio'
import { guid } from '../utils'
import { HarmonyTitle } from '../harmony'
import { paletteUtils as utils } from './paletteUtils'
import { GetColorName } from 'hex-color-to-color-name'

// TYPES
// .................................................
// TYPES

export interface PaletteColorType {
   role: string
   name: string
   shade: ColorShadeType
   isLocked: boolean
   color: ColorType
   setLock: (lock: boolean) => void
}

export interface ColorShadeType {
   [key: number]: ColorType
   genShades: () => void
}

// CLASSES
// ..............................................
//

export interface PaletteType {
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

interface PaletteConstructorType {
   title?: string
   primary?: PaletteColorType
   secondary?: PaletteColorType
   tertiary?: PaletteColorType
   neutral?: PaletteColorType
   success?: PaletteColorType
   warning?: PaletteColorType
   danger?: PaletteColorType
   info?: PaletteColorType
   metaData?: PaletteMetaDataType
   theme?: 'light' | 'dark'
}

export class Palette implements PaletteType {
   primary: PaletteColorType = new PaletteColor({ role: 'primary', })
   secondary: PaletteColorType = new PaletteColor({ role: 'secondary' })
   tertiary: PaletteColorType = new PaletteColor({ role: 'tertiary' })
   neutral: PaletteColorType = new PaletteColor({ role: 'neutral' })
   success: PaletteColorType = new PaletteColor({ role: 'success' })
   warning: PaletteColorType = new PaletteColor({ role: 'warning' })
   danger: PaletteColorType = new PaletteColor({ role: 'danger' })
   info: PaletteColorType = new PaletteColor({ role: 'info' })
   theme: 'light' | 'dark' = 'light' // light or dark
   temp: 'cool' | 'warm' = 'cool' // warm or cool
   metaData: PaletteMetaDataType = {
      creationTimeStamp: Date.now(),
      temp: 'cool', // warm or cool
      paletteStyle: 'pastel', // pastel or vibrant or earthy jewel or neutral or monochrome
      theme: 'dark', // light or dark
      tags: [], // passional, calm, energetic, feminane , modern , etc
   }

   private tag = 'tag'
   constructor({
      primary,
      secondary,
      tertiary,
      neutral,
      success,
      warning,
      danger,
      info,
      theme,
   }: PaletteConstructorType) {
      this.primary = primary || this.primary
      this.secondary = secondary || this.setAccent('secondary')
      this.tertiary = tertiary || this.setAccent('tertiary')
      this.neutral = neutral || this.setNeutral(theme)

      this.temp = this.setTempByColor(this.primary.shade[500])
      this.setSemanticColors()
      this.info = info || this.info
      this.success = success || this.success
      this.warning = warning || this.warning
      this.danger = danger || this.danger
      this.theme = theme || this.theme
   }

   generateBrandColors = ({ temperature = 0, fluidity = 0, style = 'pastel' }) => {
      const { primary, secondary, tertiary } = this
      const unlcockedColors = [primary, secondary, tertiary].filter(color => !color.isLocked)
      unlcockedColors.forEach(color => {})
      const { h, s, l } = primary.shade[500].hsl
   }

   setTempByColor = (color: ColorType) => {
      const { h } = color.hsl
      let temp = (h >= 0 && h <= 60) || (h >= 270 && h <= 360) ? 'cool' : 'cool'
      return temp as 'cool' | 'warm'
   }

   getColorTemp(color: ColorType) {
      const { h } = color.hsl
      return (h >= 0 && h <= 60) || (h >= 270 && h <= 360) ? 'cool' : 'warm'
   }

   _getAccentHsls = () => {
      const randomHarmony = utils.getRandomHarmonyTitle()
      const angle = utils.getHarmonyAngle(randomHarmony)
      const isRealHarmony = Math.random() > 0.5 ? true : false
      const isOffset = Math.random() > 0.5 ? true : false
      let offset = isOffset ? this.randomInRange(-7.5, 7.5) : 0

      let secondaryHsl = this.primary.shade[500].hsl
      let tertiaryHsl = this.primary.shade[500].hsl

      if (isRealHarmony) {
         let anglesDiff = Math.abs(angle - this.primary.shade[500].hsl.h)
         if (randomHarmony === 'complementary') {
            let isSplit = Math.random() > 0.5 ? true : false
            if (isSplit) {
               let newAngle = angle - anglesDiff
               secondaryHsl.h += newAngle + offset
               tertiaryHsl.h += this.secondary.shade[500].hsl.h + 30 - offset
            } else {
               const randTertiaryHarmony = utils.getRandomHarmonyTitle()
               secondaryHsl.h += angle - anglesDiff + offset
               tertiaryHsl.h += utils.getHarmonyAngle('analogous' as typeof randomHarmony) - offset
            }
         } else {
            secondaryHsl.h += angle + offset
            tertiaryHsl.h -= angle - offset
         }
      } else {
         tertiaryHsl.h += this.secondary.shade[500].hsl.h + 30 + offset
      }

      const sl = utils.getRandomHslByPaletteStyle(this.metaData.paletteStyle)
      // secondaryHsl.s = sl.s
      // secondaryHsl.l = sl.l

      tertiaryHsl.s = sl.s
      // tertiaryHsl.l = sl.l

      return { secondaryHsl, tertiaryHsl }
   }

   setAccent = (role: 'secondary' | 'tertiary') => {
      const { secondaryHsl, tertiaryHsl } = this._getAccentHsls()
      const secondary = new Color({ hsl: secondaryHsl })
      const tertiary = new Color({ hsl: tertiaryHsl })
      const selectedRole = role === 'secondary' ? secondary : tertiary
      return new PaletteColor({ color: selectedRole, role })
   }

   _getAccent = () => {
      let AAhex
      let accentColor = new Color({ hex: AAhex })
      const validHueAngles = [30, -30, 210, 150, 120, -120, 180]
      const maxOffset = 10
      const randAdjacent = Math.floor(Math.random() * 2) === 0 ? -30 : 30
      const primaryHue = this.primary.shade[500].hsl.h
      let inRange = false
      let nonce = 0
      const offset = Math.floor(Math.random() * maxOffset)
      const secondaryHueDirection = Math.floor(Math.random() * 2) === 0 ? -1 : 1
      while (!inRange) {
         nonce++
         AAhex = getRandomAAColor(this.primary.shade[500].hex)
         accentColor = new Color({ hex: AAhex })
         const randomHueRange = Math.floor(Math.random() * validHueAngles.length)
         const hue =
            secondaryHueDirection > 0
               ? primaryHue + validHueAngles[randomHueRange]
               : primaryHue - validHueAngles[randomHueRange]
         if (accentColor.hsl.h > hue - offset && accentColor.hsl.h < hue + offset) {
            inRange = true
         }
         if (nonce === 500) {
            accentColor = new Color({ hsl: { h: this.primary.shade[500].hsl.h + randAdjacent, s: 0.5, l: 0.5 } })
            inRange = true
         }
      }

      let secondaryColor = new PaletteColor({ color: accentColor, role: 'secondary' })
      let { h, s } = secondaryColor.shade[500].hsl
      let primaryLum = this.primary.shade[500].hsl.l
      let primarySat = this.primary.shade[500].hsl.s
      let newColor = new Color({ hsl: { h, s: primarySat, l: primaryLum } })
      secondaryColor = new PaletteColor({ color: newColor, role: 'secondary' })

      return secondaryColor
   }

   setSemanticColors = () => {
      let primaryHue = this.primary.shade[500].hsl.h
      let colorName = utils.getColorNameByHue(primaryHue)
      let randOffset = this.randomInRange(-10, 10)
      let randSat = +this.randomInRange(0.7, 1).toFixed(2)
      let randLum = +this.randomInRange(0.5, 0.7).toFixed(2)
      let randWarningHue = this.randomInRange(15, 70)
      let randInfoHue = this.randomInRange(200, 270)
      if (colorName === 'green' || colorName == 'green-blue' || colorName == 'yellow-green') {
         this.success = new PaletteColor({
            role: 'success',
            color: new Color({ hsl: { h: primaryHue, s: randSat, l: randLum } }),
         })
      } else {
         let successHsl = { h: (randOffset + 120) % 360, s: randSat, l: randLum }
         this.success = new PaletteColor({
            role: 'success',
            color: new Color({ hsl: successHsl }),
         })
      }
      let warningHsl = { h: randWarningHue, s: randSat, l: randLum }
      let dangerHsl = { h: (randOffset + 0) % 360, s: randSat, l: randLum }
      let infoHsl = { h: randInfoHue, s: randSat, l: randLum }
      this.warning = new PaletteColor({
         role: 'warning',
         color: new Color({ hsl: warningHsl }),
      })
      this.danger = new PaletteColor({
         role: 'danger',
         color: new Color({ hsl: dangerHsl }),
      })
      this.info = new PaletteColor({
         role: 'info',
         color: new Color({ hsl: infoHsl }),
      })
   }

   randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }

   setNeutral = (theme: 'light' | 'dark' = this.theme) => {
      const neutralHsl = utils.getRandomHslByPaletteStyle(this.metaData.paletteStyle)
      const randomHarmonyTitle = utils.getRandomHarmonyTitle()
      const isOfseet = Math.floor(Math.random() * 2) === 0 ? true : false
      let offset = isOfseet ? this.randomInRange(-10, 10) : 0
      const primaryHue = this.primary.shade[500].hsl.h
      let harmonyAngle = utils.getHarmonyAngle(randomHarmonyTitle)
      neutralHsl.h = (primaryHue + harmonyAngle + offset) % 360
      neutralHsl.l = +this.randomInRange(0.95, 1).toFixed(2)
      if (theme === 'dark') {
         neutralHsl.l = +this.randomInRange(0, 0.15).toFixed(2)
      }
      neutralHsl.s = +this.randomInRange(0, 0.1).toFixed(2)
      return new PaletteColor({
         role: 'neutral',
         color: new Color({ hsl: neutralHsl }),
      })
   }
}

export class BrandShader implements ColorShadeType {
   [key: number]: ColorType

   constructor({ color = new Color({}) }: { color: ColorType }) {
      this[500] = color
      this.genShades()
   }

   genShades = () => {
      this[100] = this.genShade100()
      this[900] = this.genShade900()

      this[300] = this.genMidShade(this[100], this[500])
      this[200] = this.genMidShade(this[100], this[300])
      this[400] = this.genMidShade(this[300], this[500])

      this[700] = this.genMidShade(this[500], this[900])
      this[800] = this.genMidShade(this[700], this[900])
      this[600] = this.genMidShade(this[500], this[700])
   }

   genShade100 = () => {
      const initialHue = this[500].hsl.h
      const randomSat = this._randomNumInRange(0.1, 0.2)
      const randomLum = this._randomNumInRange(0.95, 0.97)
      const shade100Hsl = { h: initialHue, s: randomSat, l: randomLum }
      return new Color({ hsl: shade100Hsl })
   }

   genShade900 = () => {
      const initialHue = this[500].hsl.h
      const sat = Math.min(0.9, this[500].hsl.s * 1.25)
      const lum = Math.max(this[500].hsl.l * 0.75, 0.1)
      const shade900Hsl = { h: initialHue, s: sat, l: lum }
      return new Color({ hsl: shade900Hsl })
   }

   genMidShade = (shade1: ColorType, shade2: ColorType) => {
      const initialHue = this[500].hsl.h
      const hsl1 = shade1.hsl
      const hsl2 = shade2.hsl
      const midS = (hsl1.s + hsl2.s) / 2
      const midL = (hsl1.l + hsl2.l) / 2
      const newHsl = { h: initialHue, s: midS, l: midL }
      return new Color({ hsl: newHsl })
   }

   _randomNumInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }
}

export class SemanticShader implements ColorShadeType {
   [key: number]: ColorType
   // get genShades()  from super

   constructor({ color = new Color({}) }: { color: ColorType }) {
      this[500] = color
      this.genShades()
   }

   genShades = () => {
      this[100] = this.genShade100()
      this[900] = this.genShade900()

      this[300] = this.genMidShade(this[100], this[500])
      this[200] = this.genMidShade(this[100], this[300])
      this[400] = this.genMidShade(this[300], this[500])

      this[700] = this.genMidShade(this[500], this[900])
      this[800] = this.genMidShade(this[700], this[900])
      this[600] = this.genMidShade(this[500], this[700])
   }

   genShade100 = () => {
      const initialHue = this[500].hsl.h
      const randomSat = this._randomNumInRange(0.1, 0.2)
      const randomLum = this._randomNumInRange(0.95, 0.97)
      const shade100Hsl = { h: initialHue, s: randomSat, l: randomLum }
      return new Color({ hsl: shade100Hsl })
   }

   genShade900 = () => {
      const initialHue = this[500].hsl.h
      const sat = Math.min(0.9, this[500].hsl.s * 1.25)
      const lum = Math.max(this[500].hsl.l * 0.75, 0.1)
      const shade900Hsl = { h: initialHue, s: sat, l: lum }
      return new Color({ hsl: shade900Hsl })
   }

   genMidShade = (shade1: ColorType, shade2: ColorType) => {
      const initialHue = this[500].hsl.h
      const hsl1 = shade1.hsl
      const hsl2 = shade2.hsl
      const midS = (hsl1.s + hsl2.s) / 2
      const midL = (hsl1.l + hsl2.l) / 2
      const newHsl = { h: initialHue, s: midS, l: midL }
      return new Color({ hsl: newHsl })
   }

   _randomNumInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }
}

export class NeutralsShader implements ColorShadeType {
   [key: number]: ColorType

   private offset = 0.1

   constructor({ color = new Color({}) }: { color: ColorType }) {
      this[500] = color
      this.genShades()
   }

   genShades = () => {
      this[100] = this.genShade100()
      this[900] = this.genShade900()

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

   private genShade900 = () => {
      const initialHue = this[500].hsl.h
      const sat = Math.min(0.9, this[500].hsl.s * 1.25)
      const lum = Math.max(this[500].hsl.l * 0.75, 0.1)
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
}

export type PaletteColorRole = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'success' | 'info' | 'danger' | 'neutral'

export class PaletteColor implements PaletteColorType {
   _id: string
   role: string
   color: ColorType
   name: string = ''
   shade: ColorShadeType = new BrandShader({ color: new Color({}) })
   isLocked: boolean = false

   constructor({ role, color, _id }: { role: PaletteColorRole; color?: ColorType; hex?: string; _id?: string }) {
      this.role = role
      this.color = color || new Color({})
      this._id = _id || guid()
      this.shade[500] = this.color
      this.shade.genShades()
      this.isLocked = false
      this.name = GetColorName(this.color.hex)
   }

   setLock = (isLocked: boolean) => {
      this.isLocked = isLocked
   }

   genShades = () => {
      this.shade.genShades()
   }
}

export class BrandColor extends PaletteColor {
   constructor({ role, color, hex, _id }: { role: PaletteColorRole; color: ColorType; hex?: string; _id?: string }) {
      super({ role, color, hex, _id })
      this.shade = new BrandShader({ color: this.color || new Color({ hex: hex }) })
   }

   toggleLock = () => {
      this.isLocked = !this.isLocked
   }

   genShades = () => {
      this.shade.genShades()
   }
}
