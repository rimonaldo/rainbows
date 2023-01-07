import { userService } from '../../services/user.service'

const INITIAL_STATE = {
   loggedUser: JSON.parse(sessionStorage.getItem('loggedUser')) || null,
   moves: JSON.parse(localStorage.getItem('userMoves')) || [],
   balance: 0,
}

export function userReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'SET_LOGGED_USER':
         return {
            ...state,
            loggedUser: action.user,
         }

      case 'SET_BALANCE':
         return {
            ...state,
            balance: action.balance,
         }

      case 'SEND_COINS':
         const { loggedUser } = state
         const { username, walletAddress, _id } = loggedUser
         const move = {
            status: 'pending',
            from: { username, walletAddress, _id },
            at: Date.now(),
            amount: action.amount,
            _id: action._id,
            to: { username: action.to.username, _id: action.to._id },
         }
         if (action.description) move.description = action.description
         console.log('move description: \n, ', move.description)
         let moves = loggedUser.moves
         if (!moves || !moves.length) moves = []
         moves.unshift(move)
         let toMoves = action.to.moves
         if (!toMoves || !toMoves.length) toMoves = []
         move.recived = true
         toMoves.unshift(move)
         action.to.moves = [...toMoves]
         userService.updateUser(action.to)
         return {
            ...state,
            loggedUser: {
               ...loggedUser,
               coins: loggedUser.coins - action.amount,
               moves,
            },
         }

      case 'SAVE_USER':
         return {
            ...state,
            loggedUser: action.userToUpadte,
         }

      default:
         return state
   }
}
