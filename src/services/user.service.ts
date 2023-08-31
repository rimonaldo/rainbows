// userService.ts
import { User } from '../types'
import httpService from '../API/http.service'

type Credentials = {
   username: string
   password: string
}

export const userService = {
   getUsers: async (): Promise<User[]> => {
      return (await httpService.get('user')).data
   },
   getUser: async (id: string): Promise<User> => {
      return (await httpService.get(`user/${id}`)).data
   },
   createUser: async (user: User): Promise<User> => {
      return (await httpService.post('user', user)).data
   },
   updateUser: async (id: string, user: User): Promise<User> => {
      return (await httpService.put(`user/${id}`, user)).data
   },
   deleteUser: async (id: number): Promise<void> => {
      return httpService.delete(`user/${id}`)
   },
   login: async (credentials: Credentials): Promise<User> => {
      return (await httpService.post('auth/login', credentials)).data
   },
   signup: async (credentials: Credentials): Promise<User> => {
      return (await httpService.post('auth/signup', credentials)).data
   },
   logout: async (): Promise<void> => {
      return httpService.post('auth/logout')
   },
   addPaletteId: async (user: User, paletteId: string): Promise<User> => {
      user.savedPalettes.push(paletteId)
      return httpService.post(`user/${user._id}/palettes`, { paletteId })
   },
   getCompletion: async (data: string): Promise<any> => {
      const prompt = {
         prompt: data,
      }
      return (await httpService.post('open/', prompt)).data
   },
}
