type EntityType = string
type Entity = { _id: string; [key: string]: any }
type Entities = Entity[]
import { reject } from 'lodash'
import { User } from '../types'
export const storageService = {
   query,
   get,
   post,
   put,
   remove,
   clear,
   postMany,
   getLoggedinUser,
   setUser,

}

function query(entityType: EntityType): Promise<Entities> {
   var entities = JSON.parse(localStorage.getItem(entityType) || '{"data": []}').data;
   return Promise.resolve(entities);
}

function get(entityType: EntityType, entityId: string): Promise<Entity | undefined> {
   return query(entityType).then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType: EntityType, newEntity: Entity): Promise<Entity> {
   return query(entityType).then(entities => {
      entities.push(newEntity)
      _save(entityType, entities)
      return newEntity
   })
}

function postMany(entityType: EntityType, newEntities: Entities): Promise<Entities> {
   return query(entityType).then(entities => {
      entities.push(...newEntities)
      _save(entityType, entities)
      return entities
   })
}

function put(entityType: EntityType, updatedEntity: Entity): Promise<Entity> {
   return query(entityType).then(entities => {
      const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
      entities.splice(idx, 1, updatedEntity)
      _save(entityType, entities)
      return updatedEntity
   })
}

function remove(entityType: EntityType, entityId: string): Promise<void> {
   return query(entityType).then(entities => {
      const idx = entities.findIndex(entity => entity._id === entityId)
      entities.splice(idx, 1)
      _save(entityType, entities)
   })
}

function clear(entityType: EntityType): Promise<void> {
   return query(entityType).then(entities => {
      entities.splice(0, entities.length)
      _save(entityType, entities)
   })
}

function _save(entityType: EntityType, entities: Entities): void {
   localStorage.setItem(entityType, JSON.stringify({data: entities}))
}

function _makeId(length: number = 8): string {
   let text = ''
   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
   }
   return text
}

function getLoggedinUser(): Promise<User> {
   return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('user') || 'null')
      if (user) {
         resolve(user.user)
      } else {
         reject('No user found')
      }
   })
}

function setUser(user: User): Promise<User> {
   return new Promise((resolve, reject) => {
      localStorage.setItem('user', JSON.stringify({user}))
      resolve(user)
   })
}
