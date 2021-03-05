import { 
  AuthActionType, 
  AuthState, 
  LOGIN, 
  LOGOUT,
  SET_REMEMBER_ME 
} from '../types'

const initialState: AuthState = {
  username: window.localStorage.getItem('username') || undefined,
  session: window.localStorage.getItem('session') || undefined,
  loggedIn: Boolean(window.localStorage.getItem('username') && window.localStorage.getItem('session')),
  rememberMe: window.localStorage.getItem('rememberMe') === 'true'
}

export const authReducer = (state = initialState, action: AuthActionType): AuthState => {
  switch(action.type){
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        session: action.payload.session
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        username: undefined,
        session: undefined
      }
    case SET_REMEMBER_ME:
      return {
        ...state,
        rememberMe: action.remember
      }
    default:
      return state
  }
}