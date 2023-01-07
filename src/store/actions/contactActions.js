import { contactService } from '../../services/contact.service'
import { storageService } from '../../services/storage.service'
export function loadContacts() {
   return async (dispatch, getState) => {
      try {
         const { filterBy } = getState().contactModule
         let contacts = await contactService.getContacts(filterBy)
         // storageService.postMany(contactService.CONTACTS_KEY, contacts)
         dispatch({ type: 'SET_CONTACTS', contacts })
      } catch (err) {
         console.log('err:', err)
      }
   }
}

export function removeContact(contactId) {
   return async (dispatch, getState) => {
      try {
         const contact = await contactService.deleteContact(contactId)
         dispatch({ type: 'REMOVE_CONTACT', contactId })
         return contact
      } catch (err) {
         console.log('err:', err)
      }
   }
}

export function setFilterBy(filterBy) {
   return dispatch => {
      dispatch({ type: 'SET_FILTER_BY', filterBy })
   }
}
