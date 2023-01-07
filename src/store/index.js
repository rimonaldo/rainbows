import { applyMiddleware, legacy_createStore as createStore, compose, combineReducers } from "redux"
import { contactReducer } from "./reducers/contactReducer"
import { userReducer } from "./reducers/userReducer"
import { tokenReducer } from "./reducers/tokenReducer"
import thunk from "redux-thunk"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
   contactModule: contactReducer,
   userModule: userReducer,
   tokenModule: tokenReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
