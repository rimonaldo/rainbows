import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PaletteColorRole, PaletteType } from '../types'
import { MiniPaletteType, MiniPalette } from '../types/Palette'
import { paletteService } from '../services/Palette.service'
import { userService } from '../services/user.service'

type State = {
   miniPalette: MiniPaletteType | null
   palette: PaletteType
   savePalette: (palette: PaletteType) => void
   getEmptyPalette: () => PaletteType
   setPalette: (palette: PaletteType) => void
   generatePalette: (temp: 1 | 2 | 3, fludity: 1 | 2 | 3, palette: PaletteType) => void
   // removePalette: (id: string) => void
   // updatePalette: (id: string, palette: Palette) => void
   // getMiniPalettes: () => MiniPaletteType[]
   savedPaletteId: string
   loadPalette: (id: string) => void
   count: number
   increment: () => void
   setColorLock: (palette:PaletteType , role:PaletteColorRole, newLockState:boolean) => void
   setColor:(palette:PaletteType , role:PaletteColorRole, newHex:string) => void
}

export const usePaletteStore = create(
   persist<State>(
      // persist the store to localStorage
      set => ({
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
         savePalette: async palette => {
            try {
               const miniPalette = await paletteService.addPalette(palette)
               set({ miniPalette, savedPaletteId: miniPalette._id })
            } catch (error) {
               console.log(error)
            }
         },
         generatePalette: async (temp: 1 | 2 | 3 = 1, fludity: 1 | 2 | 3 = 1, palette: PaletteType) => {
            const newPalette = await paletteService.generateBrand(palette, temp, fludity)
            set({ palette: newPalette })
         },
         loadPalette: async id => {
            const miniPalette = await paletteService.getPalette(id)
            console.log('miniPalette', miniPalette)

            set({ palette: paletteService.buildFromMiniPalette(miniPalette), savedPaletteId: miniPalette._id })
         },
         setColorLock: (palette:PaletteType ,role:PaletteColorRole,newLockState:boolean) => {
            const newPalette = paletteService.setColorLock(palette,role,newLockState)
            set({ palette: newPalette})
         },
         setColor:(palette:PaletteType ,role:PaletteColorRole,newHex:string) => {
            const newPalette = paletteService.setColor(palette,role,newHex)
            set({ palette: newPalette})
         }
      }),

      {
         name: 'user-storage', // unique name
         getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
      }
   )
)
