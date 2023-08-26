import { create } from 'zustand'
import { PaletteColorRole, PaletteColorStyle, PaletteType, CustomStyleType, ColorStyleType } from '../types'
import { MiniPaletteType, MiniPalette, TemplateType } from '../types/Palette'
import { paletteService } from '../services/Palette.service'

type State = {
   miniPalette: MiniPaletteType | null
   palette: PaletteType
   savePalette: (palette: PaletteType) => void
   getEmptyPalette: () => PaletteType
   setPalette: (palette: PaletteType) => void
   generatePalette: (temp: 1 | 2 | 3, fludity: 1 | 2 | 3, palette: PaletteType) => void
   savedPaletteId: string
   loadPalette: (id: string) => void
   count: number
   increment: () => void
   setColorLock: (palette: PaletteType, role: PaletteColorRole, newLockState: boolean) => void
   setColor: (palette: PaletteType, role: PaletteColorRole, newHex: string) => void
   genColorByStyle(palette: PaletteType, role: PaletteColorRole, customStyle: ColorStyleType): void
   addCustomStyle: (palette: PaletteType, role: PaletteColorRole, style: ColorStyleType) => void
   setActiveTemplate: (palette: PaletteType, templateIdx: number) => void
   addTemplate: (palette: PaletteType, template: TemplateType) => void
}

export const usePaletteStore = create<State>(set => ({
   count: 0,
   increment: () => set(state => ({ count: state.count + 1 })),
   palette: paletteService.getEmptyPalette(), // maybe get from localStorage
   miniPalette: null,
   savedPaletteId: '',
   setPalette: async (palette: PaletteType) => {
      set({ palette })
   },
   getEmptyPalette: () => {
      return paletteService.getEmptyPalette()
   },
   generatePalette: async (temp: 1 | 2 | 3 = 1, fludity: 1 | 2 | 3 = 1, palette: PaletteType) => {
      try {
         const newPalette = await paletteService.generateBrand(palette, temp, fludity)
         set({ palette: newPalette })
      } catch (error) {
         console.log(error)
      }
   },
   savePalette: async palette => {
      try {
         const miniPalette = await paletteService.addPalette(palette)
         set({ miniPalette, savedPaletteId: miniPalette._id })
      } catch (error) {
         console.log(error)
      }
   },
   loadPalette: async id => {
      try {
         const miniPalette = await paletteService.getPalette(id)
         set({ palette: paletteService.buildFromMiniPalette(miniPalette), savedPaletteId: miniPalette._id })
      } catch (error) {
         console.log(error)
      }
   },
   setColorLock: (palette: PaletteType, role: PaletteColorRole, newLockState: boolean) => {
      const newPalette = paletteService.setColorLock(palette, role, newLockState)
      set({ palette: newPalette })
   },
   setColor: (palette: PaletteType, role: PaletteColorRole, newHex: string) => {
      const newPalette = paletteService.setColor(palette, role, newHex)
      set({ palette: newPalette })
   },
   genColorByStyle: (palette: PaletteType, role: PaletteColorRole, style: ColorStyleType) => {
      const newPaletteColor = paletteService.genColorByStyle(palette, role, style)
      const newPalette = paletteService.setColor(palette, role, newPaletteColor.hex)
      set({ palette: newPalette })
   },
   addCustomStyle: (palette: PaletteType, role: PaletteColorRole, customStyle: ColorStyleType) => {
      const newPalette = paletteService.addStyle(palette, role, customStyle)
      set({ palette: newPalette })
      console.log('newPalette', newPalette)
   },
   setActiveTemplate: (palette: PaletteType, templateIdx: number) => {
      const newPalette = paletteService.setActiveTemplate(palette, palette.templates[templateIdx])
      set({ palette: newPalette })
   },
   addTemplate: (palette: PaletteType, template: TemplateType) => {
      const newPalette = paletteService.addTemplate(palette, template)
      set({ palette: newPalette })
   },
}))
