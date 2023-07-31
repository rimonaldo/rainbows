// store.ts
import create from 'zustand'
import { userService } from '../services/user.service'
import { produce } from 'immer'
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
   addSavedPalette: (paletteId: string) => void
}

export const useUserStore = create<State>(set => ({
   user: null,
   loggedIn: false,
   mockCredentials,
   logIn: async credentials => {
      const user = await userService.login(credentials)
      console.log(user)

      if (user) {
         storageService.setUser(user)
         set({ user, loggedIn: true })
      }
   },
   logOut: () => async () => {
      console.log('logging out')

      await storageService.clear('user')
      await userService.logout()
      set({ user: null, loggedIn: false })
   },
   signup: async credentials => {
      const user = await userService.signup(credentials)
      if (user) {
         set({ user, loggedIn: true })
      }
   },
   updateUser: user => set({ user }),
   addSavedPalette: async paletteId => {
      const loggedUser = await storageService.getLoggedinUser()
      if (loggedUser) {
         if (!loggedUser.savedPalettes) loggedUser.savedPalettes = []
         loggedUser.savedPalettes.push(paletteId)
         console.log(loggedUser.savedPalettes)

         const updatedUser = await userService.updateUser(loggedUser._id, loggedUser)
         storageService.setUser(updatedUser)
         set({
            user: updatedUser,
         })
      }
   },
}))
