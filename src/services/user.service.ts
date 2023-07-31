// userService.ts
import { User } from '../types'
import httpService from './http.service'

type Credentials = {
   username: string
   password: string
}

type State = {
   user: User | null
   loggedIn: boolean
   logIn: (credentials: Credentials) => Promise<void>
   logOut: () => void
   signup: (credentials: Credentials) => Promise<void>
   updateUser: (user: User) => void
   addSavedPalette: (paletteId: string) => void
}

const _saveLocalUser = (user: User) => {
   // save user to local storage or somewhere
   // this implementation depends on your application's requirements
}

export const userService = {
   getUsers: async (): Promise<User[]> => {
      return httpService.get('user')
   },
   getUser: async (id: number): Promise<User> => {
      return httpService.get(`user/${id}`)
   },
   createUser: async (user: User): Promise<User> => {
      return httpService.post('user', user)
   },
   updateUser: async (id: string, user: User): Promise<User> => {
      return httpService.put(`user/${id}`, user)
   },
   deleteUser: async (id: number): Promise<void> => {
      return httpService.delete(`user/${id}`)
   },
   login: async (credentials: Credentials): Promise<User> => {
      return (await httpService.post('auth/login', credentials)).data
   },
   signup: async (credentials: Credentials): Promise<User> => {
      return httpService.post('signup', credentials)
   },
   logout: async (): Promise<void> => {
      return httpService.post('logout')
   },
   addPaletteId: async (user: User, paletteId: string): Promise<User> => {
      user.savedPalettes.push(paletteId)
      return httpService.post(`user/${user._id}/palettes`, { paletteId })
   },
}
