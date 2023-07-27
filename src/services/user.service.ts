// userService.ts
import { User } from '../types'
import httpService from './http.service'

type Credentials = {
   username: string
   password: string
}

const _saveLocalUser = (user: User) => {
   // save user to local storage or somewhere
   // this implementation depends on your application's requirements
}

export const userService = {
   getUsers: async (): Promise<User[]> => {
      return httpService.get('users')
   },
   getUser: async (id: number): Promise<User> => {
      return httpService.get(`users/${id}`)
   },
   createUser: async (user: User): Promise<User> => {
      return httpService.post('users', user)
   },
   updateUser: async (id: number, user: User): Promise<User> => {
      return httpService.put(`users/${id}`, user)
   },
   deleteUser: async (id: number): Promise<void> => {
      return httpService.delete(`users/${id}`)
   },
   login: async (credentials: Credentials): Promise<User> => {
      return httpService.post('auth/login', credentials)
   },
   signup: async (credentials: Credentials): Promise<User> => {
      return httpService.post('signup', credentials)
   },
   logout: async (): Promise<void> => {
      return httpService.post('logout')
   },
}
