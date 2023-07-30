import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PaletteType } from '../types'
import { MiniPaletteType, MiniPalette } from '../types/Palette'
import { paletteService } from '../services/Palette.service'
import { userService } from '../services/user.service'

type State = {
   miniPalette: MiniPaletteType | null
   palette: PaletteType
   addPalette: (palette: PaletteType) => void
   getEmptyPalette: () => PaletteType
   setPalette: (palette: PaletteType) => void
   // removePalette: (id: string) => void
   // updatePalette: (id: string, palette: Palette) => void
   // getMiniPalettes: () => MiniPaletteType[]
}

export const usePaletteStore = create(
   persist<State>(
      // persist the store to localStorage
      set => ({
         miniPalette: null,
         palette: paletteService.getEmptyPalette(),
         addPalette: async palette => {
            const miniPalette = await paletteService.addPalette(palette.getMiniPalette())
            if (miniPalette) {
               set({ miniPalette })
            }
         },
         setPalette: async (palette: PaletteType) => {
            set({ palette })
         },
         getEmptyPalette: () => {
            return paletteService.getEmptyPalette()
         },

         // updatePalette: async (id, palette) => {
         //    await paletteService.updatePalette(id, palette)
         //    set({ miniPalette: null })
         // },
      }),
      {
         name: 'user-storage', // unique name
         getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
      }
   )
)
