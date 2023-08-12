// store.ts
import create from 'zustand'
import { userService } from '../services/user.service'
import { storageService } from '../services/localStorage.service'
import { User } from '../types'

type Credentials = {
   username: string
   password: string
}

const mockCredentials: Credentials = {
   username: 'Rimonaldo123',
   password: '123',
}

type State = {
   user: User | null
   loggedIn: boolean
   mockCredentials: Credentials
   logIn: (credentials: Credentials) => Promise<void>
   logOut: () => void
   signup: (credentials: Credentials) => Promise<void>
   updateUser: (user: User) => void
   savePaletteId: (paletteId: string) => void
}

export const useUserStore = create<State>(set => ({
   user: null,
   loggedIn: false,
   mockCredentials,
   logOut: async () => {
      console.log('logging out')
      await userService.logout()
      storageService.setUser(null as any)
      set({ user: null, loggedIn: false })
   },
   logIn: async credentials => {
      const user = await userService.login(credentials)
      if (user) {
         console.log(user.username + ' logged in')
         storageService.setUser(user)
         set({ user, loggedIn: true })
      }
   },

   signup: async credentials => {
      const user = await userService.signup(credentials)
      if (user) {
         set({ user, loggedIn: true })
      }
   },
   updateUser: user => set({ user }),
   savePaletteId: async paletteId => {
      const loggedInUser = await storageService.getLoggedinUser()
      if(!loggedInUser._id) return
      const user = await userService.getUser(loggedInUser._id)
      if (user) {
         if (!user.savedPalettes) user.savedPalettes = []
         user.savedPalettes.push(paletteId)
         const updatedUser = await userService.updateUser(user._id, user)
         storageService.setUser(updatedUser)
         set({
            user: updatedUser,
         })
      }
   },
}))
