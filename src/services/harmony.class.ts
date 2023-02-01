import { ColorType } from '../types/ColorType'
import { HarmonyTitle } from '../types/HarmonyType'
import { hslToRgb, rgbToHex } from '.././services/colorService'
import { SchemeType } from '../types/HarmonyType'
import { Color } from './color.class'
export interface HarmonyType {
   mainColor: ColorType
   complementary: SchemeType
   monocromatic: SchemeType
   triadic: SchemeType
   analogous: SchemeType
   
   getMonoColors(): SchemeType
   getTriadColors(): SchemeType
   getAnalogColors(): SchemeType
   getCompColor(): SchemeType
   getHarmonyByTitle(title: HarmonyTitle): SchemeType
}

export class Harmony implements HarmonyType {
   mainColor: ColorType
   complementary: SchemeType
   monocromatic: SchemeType
   triadic: SchemeType
   analogous: SchemeType
   constructor(mainColor: ColorType) {
      this.mainColor = mainColor
      this.monocromatic = this.getMonoColors()
      this.triadic = this.getTriadColors()
      this.analogous = this.getAnalogColors()
      this.complementary = this.getCompColor()
   }
   getMonoColors(): SchemeType {
      return {
         title: HarmonyTitle.Monochromatic,
         mainColor: this.mainColor,
         colors: this._mapHslstoColors(this.mainColor.getMonoHsls()),
      }
   }
   getTriadColors(): SchemeType {
      return {
         title: HarmonyTitle.Triadic,
         mainColor: this.mainColor,
         colors: this._mapHslstoColors(this.mainColor.getTriadHsls()),
      }
   }

   getCompColor(): SchemeType {
      return {
         title: HarmonyTitle.Complementary,
         mainColor: this.mainColor,
         colors: this._mapHslstoColors(this.mainColor.getCompHsls()),
      }
   }
   getAnalogColors(): SchemeType {
      return {
         title: HarmonyTitle.Analogous,
         mainColor: this.mainColor,
         colors: this._mapHslstoColors(this.mainColor.getAnalogHsls()),
      }
   }
   getHarmonyByTitle(title: HarmonyTitle): SchemeType {
      switch (title) {
         case HarmonyTitle.Monochromatic:
            return this.getMonoColors()
         case HarmonyTitle.Triadic:
            return this.getTriadColors()
         case HarmonyTitle.Complementary:
            return this.getCompColor()
         case HarmonyTitle.Analogous:
            return this.getAnalogColors()
         default:
            return this.getMonoColors()
      }
   }

   _mapHslstoColors(hsls: { h: number; s: number; l: number }[]): ColorType[] {
      return hsls.map(hsl => new Color({hsl}))
   }
}
