import { combineReducers, createStore } from 'redux'
import { appReducer } from './reducers/app'
import { authReducer } from './reducers/auth'


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)