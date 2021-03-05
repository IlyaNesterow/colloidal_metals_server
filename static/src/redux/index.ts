import { combineReducers, createStore } from 'redux'
import { appReducer } from './reducers/app'
import { authReducer } from './reducers/auth'
import { themeReducer } from './reducers/theme'


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  theme: themeReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)