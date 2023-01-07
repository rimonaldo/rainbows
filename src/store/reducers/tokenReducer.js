const INITIAL_STATE = {
   rate: JSON.parse(localStorage.getItem('rate')) || '',
   balannce: 0,
   pending: [],
   block: null,
   blocks: JSON.parse(localStorage.getItem('blocks')) || [],
}

export function tokenReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'SET_RATE':
         localStorage.setItem('rate', JSON.stringify(action.rate))
         return {
            ...state,
            rate: action.rate,
         }

      case 'GET_BALANCE':
         return {
            ...state,
            balance: action.balance,
         }

      case 'SET_PENDING':
         localStorage.setItem('pending', JSON.stringify(action.pending))
         return {
            ...state,
            pending: action.pending,
         }

      case 'MINE_PENDING':
         // localStorage.setItem('pending', JSON.stringify(action.rate))
         return {
            ...state,
            block: action.block,
         }

      case 'SET_BLOCKS':
         localStorage.setItem('blocks', JSON.stringify(action.blocks))
         return {
            ...state,
            blocks: action.blocks,
         }

      default:
         return state
   }
}
