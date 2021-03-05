import { 
  AuthActionType, 
  AuthState, 
  LOGIN, 
  LOGOUT 
} from '../types'

const initialState: AuthState = {
  username: undefined,
  loggedIn: false,
}

export const authReducer = (state = initialState, action: AuthActionType): AuthState => {
  switch(action.type){
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        username: undefined,
      }
    default:
      return state
  }
}