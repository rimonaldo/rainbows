import { PaletteType, MiniPaletteType } from '../types'
import { PaletteColorType, MiniPaletteColorType } from '../types'
import { MiniPaletteColor } from './PaletteColor.service'
// import { MiniPalette } from '../types/Palette'
import { PaletteColor } from './PaletteColor.service'
import { Color } from './color.service'
import httpService from './http.service'
import { ColorType } from '../types'
import { hex, hsl, rgb, hsv } from '../types'
import { paletteUtils as utils } from './palette/paletteUtils'
import { getRandomAAColor } from 'accessible-colors'

export class MiniPalette implements MiniPaletteType {
   _id?: string
   primary: MiniPaletteColorType
   secondary: MiniPaletteColorType
   tertiary: MiniPaletteColorType
   info: MiniPaletteColorType
   success: MiniPaletteColorType
   warning: MiniPaletteColorType
   danger: MiniPaletteColorType
   neutral: MiniPaletteColorType

   constructor({ palette }: { palette?: PaletteType }) {
      if (palette) {
         this.primary = new MiniPaletteColor(palette.primary)
         this.secondary = new MiniPaletteColor(palette.secondary)
         this.tertiary = new MiniPaletteColor(palette.tertiary)
         this.info = new MiniPaletteColor(palette.info)
         this.success = new MiniPaletteColor(palette.success)
         this.warning = new MiniPaletteColor(palette.warning)
         this.danger = new MiniPaletteColor(palette.danger)
         this.neutral = new MiniPaletteColor(palette.neutral)
      } else {
         this.primary = new MiniPaletteColor({ role: 'primary' })
         this.secondary = new MiniPaletteColor({ role: 'secondary' })
         this.tertiary = new MiniPaletteColor({ role: 'tertiary' })
         this.info = new MiniPaletteColor({ role: 'info' })
         this.success = new MiniPaletteColor({ role: 'success' })
         this.warning = new MiniPaletteColor({ role: 'warning' })
         this.danger = new MiniPaletteColor({ role: 'danger' })
         this.neutral = new MiniPaletteColor({ role: 'neutral' })
      }
   }
}

export class Palette implements PaletteType {
   _id?: string | undefined
   primary: PaletteColorType
   secondary: PaletteColorType
   tertiary: PaletteColorType
   info: PaletteColorType
   success: PaletteColorType
   warning: PaletteColorType
   danger: PaletteColorType
   neutral: PaletteColorType

   constructor(miniPalette: MiniPaletteType = new MiniPalette({})) {
      if (miniPalette._id) {
         this._id = miniPalette._id
         this.primary = new PaletteColor({ hex: miniPalette.primary.hex, role: 'primary' })
         this.secondary = new PaletteColor({ hex: miniPalette.secondary.hex, role: 'secondary' })
         this.tertiary = new PaletteColor({ hex: miniPalette.tertiary.hex, role: 'tertiary' })
         this.info = new PaletteColor({ hex: miniPalette.info.hex, role: 'info' })
         this.success = new PaletteColor({ hex: miniPalette.success.hex, role: 'success' })
         this.warning = new PaletteColor({ hex: miniPalette.warning.hex, role: 'warning' })
         this.danger = new PaletteColor({ hex: miniPalette.danger.hex, role: 'danger' })
         this.neutral = new PaletteColor({ hex: miniPalette.neutral.hex, role: 'neutral' })
      } else {
         this.primary = new PaletteColor({ hex: '#000000', role: 'primary' })
         this.secondary = new PaletteColor({ hex: '#000000', role: 'secondary' })
         this.tertiary = new PaletteColor({ hex: '#000000', role: 'tertiary' })
         this.info = new PaletteColor({ hex: '#000000', role: 'info' })
         this.success = new PaletteColor({ hex: '#000000', role: 'success' })
         this.warning = new PaletteColor({ hex: '#000000', role: 'warning' })
         this.danger = new PaletteColor({ hex: '#000000', role: 'danger' })
         this.neutral = new PaletteColor({ hex: '#000000', role: 'neutral' })
      }
   }

   genBrandColors() {
      const { primary, secondary, tertiary } = this
      const unlcockedColors = [primary, secondary, tertiary].filter(color => !color.isLocked)
      unlcockedColors.forEach(color => {})
      const { h, s, l } = primary.shade[500].hsl
   }
   genSemanticColors() {}
   genNeutralColors() {}
   getMiniPalette(): MiniPaletteType {
      return new MiniPalette({ palette: this })
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

   randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }
   // _getAccentHsls = () => {
   //    const randomHarmony = utils.getRandomHarmonyTitle()
   //    const angle = utils.getHarmonyAngle(randomHarmony)
   //    const isRealHarmony = Math.random() > 0.5 ? true : false
   //    const isOffset = Math.random() > 0.5 ? true : false
   //    let offset = isOffset ? this.randomInRange(-7.5, 7.5) : 0

   //    let secondaryHsl = this.primary.shade[500].hsl
   //    let tertiaryHsl = this.primary.shade[500].hsl

   //    if (isRealHarmony) {
   //       let anglesDiff = Math.abs(angle - this.primary.shade[500].hsl.h)
   //       if (randomHarmony === 'complementary') {
   //          let isSplit = Math.random() > 0.5 ? true : false
   //          if (isSplit) {
   //             let newAngle = angle - anglesDiff
   //             secondaryHsl.h += newAngle + offset
   //             tertiaryHsl.h += this.secondary.shade[500].hsl.h + 30 - offset
   //          } else {
   //             const randTertiaryHarmony = utils.getRandomHarmonyTitle()
   //             secondaryHsl.h += angle - anglesDiff + offset
   //             tertiaryHsl.h += utils.getHarmonyAngle('analogous' as typeof randomHarmony) - offset
   //          }
   //       } else {
   //          secondaryHsl.h += angle + offset
   //          tertiaryHsl.h -= angle - offset
   //       }
   //    } else {
   //       tertiaryHsl.h += this.secondary.shade[500].hsl.h + 30 + offset
   //    }

   //    const sl = utils.getRandomHslByPaletteStyle(this.metaData.paletteStyle)
   //    // secondaryHsl.s = sl.s
   //    // secondaryHsl.l = sl.l

   //    tertiaryHsl.s = sl.s
   //    // tertiaryHsl.l = sl.l

   //    return { secondaryHsl, tertiaryHsl }
   // }

   // setAccent = (role: 'secondary' | 'tertiary') => {
   //    const { secondaryHsl, tertiaryHsl } = this._getAccentHsls()
   //    const secondary = new Color({ hsl: secondaryHsl })
   //    const tertiary = new Color({ hsl: tertiaryHsl })

   //    const selectedColor = role === 'secondary' ? secondary : tertiary
   //    return new PaletteColor(new Color({ hex: selectedColor.hex }), role)
   // }

   // _getAccent = () => {
   //    let AAhex
   //    let accentColor = new Color({ hex: AAhex })
   //    const validHueAngles = [30, -30, 210, 150, 120, -120, 180]
   //    const maxOffset = 10
   //    const randAdjacent = Math.floor(Math.random() * 2) === 0 ? -30 : 30
   //    const primaryHue = this.primary.shade[500].hsl.h
   //    let inRange = false
   //    let nonce = 0
   //    const offset = Math.floor(Math.random() * maxOffset)
   //    const secondaryHueDirection = Math.floor(Math.random() * 2) === 0 ? -1 : 1
   //    while (!inRange) {
   //       nonce++
   //       AAhex = getRandomAAColor(this.primary.shade[500].hex)
   //       accentColor = new Color({ hex: AAhex })
   //       const randomHueRange = Math.floor(Math.random() * validHueAngles.length)
   //       const hue =
   //          secondaryHueDirection > 0
   //             ? primaryHue + validHueAngles[randomHueRange]
   //             : primaryHue - validHueAngles[randomHueRange]
   //       if (accentColor.hsl.h > hue - offset && accentColor.hsl.h < hue + offset) {
   //          inRange = true
   //       }
   //       if (nonce === 500) {
   //          accentColor = new Color({ hsl: { h: this.primary.shade[500].hsl.h + randAdjacent, s: 0.5, l: 0.5 } })
   //          inRange = true
   //       }
   //    }

   //    let secondaryColor = new PaletteColor(new Color({ hex: accentColor.hex }), 'secondary')
   //    let { h, s } = secondaryColor.shade[500].hsl
   //    let primaryLum = this.primary.shade[500].hsl.l
   //    let primarySat = this.primary.shade[500].hsl.s
   //    let newColor = new Color({ hsl: { h, s: primarySat, l: primaryLum } })
   //    secondaryColor = new PaletteColor(new Color({ hex: newColor.hex }), 'secondary')

   //    return secondaryColor
   // }

   // setSemanticColors = () => {
   //    let primaryHue = this.primary.shade[500].hsl.h
   //    let colorName = utils.getColorNameByHue(primaryHue)
   //    let randOffset = this.randomInRange(-10, 10)
   //    let randSat = +this.randomInRange(0.7, 1).toFixed(2)
   //    let randLum = +this.randomInRange(0.5, 0.7).toFixed(2)
   //    let randWarningHue = this.randomInRange(15, 70)
   //    let randInfoHue = this.randomInRange(200, 270)
   //    if (colorName === 'green' || colorName == 'green-blue' || colorName == 'yellow-green') {
   //       this.success = new PaletteColor({
   //          role: 'success',
   //          color: new Color({ hsl: { h: primaryHue, s: randSat, l: randLum } }),
   //       })
   //    } else {
   //       let successHsl = { h: (randOffset + 120) % 360, s: randSat, l: randLum }
   //       this.success = new PaletteColor({
   //          role: 'success',
   //          color: new Color({ hsl: successHsl }),
   //       })
   //    }
   //    let warningHsl = { h: randWarningHue, s: randSat, l: randLum }
   //    let dangerHsl = { h: (randOffset + 0) % 360, s: randSat, l: randLum }
   //    let infoHsl = { h: randInfoHue, s: randSat, l: randLum }
   //    this.warning = new PaletteColor({
   //       role: 'warning',
   //       color: new Color({ hsl: warningHsl }),
   //    })
   //    this.danger = new PaletteColor({
   //       role: 'danger',
   //       color: new Color({ hsl: dangerHsl }),
   //    })
   //    this.info = new PaletteColor({
   //       role: 'info',
   //       color: new Color({ hsl: infoHsl }),
   //    })
   // }

   // setNeutral = (theme: 'light' | 'dark' = this.theme) => {
   //    const neutralHsl = utils.getRandomHslByPaletteStyle(this.metaData.paletteStyle)
   //    const randomHarmonyTitle = utils.getRandomHarmonyTitle()
   //    const isOfseet = Math.floor(Math.random() * 2) === 0 ? true : false
   //    let offset = isOfseet ? this.randomInRange(-10, 10) : 0
   //    const primaryHue = this.primary.shade[500].hsl.h
   //    let harmonyAngle = utils.getHarmonyAngle(randomHarmonyTitle)
   //    neutralHsl.h = (primaryHue + harmonyAngle + offset) % 360
   //    neutralHsl.l = +this.randomInRange(0.95, 1).toFixed(2)
   //    if (theme === 'dark') {
   //       neutralHsl.l = +this.randomInRange(0, 0.15).toFixed(2)
   //    }
   //    neutralHsl.s = +this.randomInRange(0, 0.1).toFixed(2)
   //    return new PaletteColor({
   //       role: 'neutral',
   //       color: new Color({ hsl: neutralHsl }),
   //    })
   // }
}

export const paletteService = {
   getPalette: async (id: string): Promise<PaletteType> => {
      return httpService.get(`palette/${id}`)
   },
   addPalette: async (palette: MiniPaletteType): Promise<MiniPaletteType> => {
      return httpService.post('palette', palette)
   },
   updatePalette: async (id: number, palette: PaletteType): Promise<PaletteType> => {
      return httpService.put(`palettes/${id}`, palette)
   },
   generateBrand: async (miniPalette: MiniPaletteType): Promise<PaletteType> => {
      const newPalette = new Palette(miniPalette)
      return new Promise((resolve, reject) => {
         newPalette.genBrandColors()
         resolve(newPalette)
      })
   },
   getEmptyPalette: (): PaletteType => {
      console.log(new Palette(new MiniPalette({})))
      return new Palette(new MiniPalette({}))
   },
}
