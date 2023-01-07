import { tokenService } from '../../services/token.service'
import { userService } from '../../services/user.service'

export function setLoggedUser(username, password) {
   return async dispatch => {
      try {
         const credentials = { username, password }
         let user
         if (password) {
            user = await userService.login(credentials)
         } else {
            user = await userService.signup(credentials)
         }
         dispatch({ type: 'SET_LOGGED_USER', user })
         
         return user
      } catch (err) {
         console.log(err)
      }
   }
}

export function sendCoins(amount, to, description) {
   return async dispatch => {
      try {
         const tx = await tokenService.addTranaction(amount, to)
         const { _id } = tx
         console.log('tx_id', _id);
         dispatch({ type: 'SEND_COINS', amount, to, _id, description })
      } catch (err) {
         console.log(err)
      }
   }
}

export function setBalance(privateKey) {
   return async dispatch => {
      try {
         const balance = await tokenService.getBalanceByKey(privateKey)
         dispatch({ type: 'SET_BALANCE', balance })
      } catch (err) {
         console.log(err)
      }
   }
}

export function saveUser(userToUpadte) {
   return async dispatch => {
      try {
         await userService.updateUser(userToUpadte)
         dispatch({ type: 'SAVE_USER', userToUpadte })
         userService._saveLocalUser(userToUpadte)
      } catch (err) {
         console.log(err)
      }
   }
}
