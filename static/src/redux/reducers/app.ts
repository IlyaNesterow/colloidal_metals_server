import { 
  AppActionType, 
  AppState, 
  SET_ERROR, 
  SET_LOADING,
  OPEN_CLOSE_MENU,
  SET_DEFAULT_THEME,
  TOGGLE_THEME
} from '../types'


const initialState: AppState = {
  error: undefined,
  loading: false,
  menuOpened: false,
  theme: window.localStorage.getItem('theme') === 'true'
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
    case SET_DEFAULT_THEME:
        return {
          ...state,
          theme: action.theme
        }
    case TOGGLE_THEME:
        return {
          ...state,
          theme: !state.theme
        }
    default:
      return state
  }
}