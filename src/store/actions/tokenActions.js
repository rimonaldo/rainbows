import { tokenService } from '../../services/token.service'
import { userService } from '../../services/user.service'
export function setRate(rate) {
   return async dispatch => {
      try {
         dispatch({ type: 'SET_RATE', rate })
         return rate
      } catch (err) {
         console.log(err)
      }
   }
}

export function getBalance(address) {
   return async dispatch => {
      try {
         dispatch({ type: 'GET_BALANCE', address })
      } catch (err) {
         console.log(err)
      }
   }
}

export function loadPending() {
   return async dispatch => {
      const pending = await tokenService.getPending()
      try {
         dispatch({ type: 'SET_PENDING', pending })
         return pending
      } catch (err) {
         console.log(err)
      }
   }
}

export function minePending() {
   return async dispatch => {
      const {walletAddress} = await userService.getUser() 
      const blocks = await tokenService.minePending(walletAddress)
      try {
         // dispatch({ type: 'MINE_PENDING' })
         dispatch({ type: 'SET_BLOCKS', blocks })
         loadPending()
         return blocks
      } catch (err) {
         console.log(err)
      }
   }
}
