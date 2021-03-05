import { 
  AppActionType, 
  AppState, 
  SET_ERROR, 
  SET_LOADING,
  OPEN_CLOSE_MENU
} from '../types'


const initialState: AppState = {
  error: undefined,
  loading: false,
  menuOpened: false
}

export const appReducer = (state = initialState, action: AppActionType): AppState => {
  switch(action.type){
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case OPEN_CLOSE_MENU:
      return {
        ...state,
        menuOpened: action.opened
      }
    default:
      return state
  }
}