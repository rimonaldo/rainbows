// store.ts
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { userService } from '../services/user.service'
export type User = {
   username: string
   password: string
}

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
}

export const useUserStore = create(
   persist<State>(
      // persist the store to localStorage
      set => ({
         user: null,
         loggedIn: false,
         mockCredentials,
         logIn: async credentials => {
            const user = await userService.login(credentials)
            if (user) {
               set({ user, loggedIn: true })
            }
         },
         logOut: () => set({ user: null, loggedIn: false }),
         signup: async credentials => {
            const user = await userService.signup(credentials)
            if (user) {
               set({ user, loggedIn: true })
            }
         },
      }),
      {
         name: 'user-storage', // unique name
         getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
      }
   )
)
