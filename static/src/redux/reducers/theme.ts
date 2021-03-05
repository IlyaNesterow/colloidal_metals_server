import {
  ThemeState,
  ThemeActionType,
  SET_DEFAULT_THEME,
  TOGGLE_THEME
} from '../types'

const initialState: ThemeState = {
  theme: window.localStorage.getItem('theme') === 'true'
}

export const themeReducer = (state = initialState, action: ThemeActionType): ThemeState => {
  switch(action.type){
    case SET_DEFAULT_THEME:
      return {
        theme: action.theme
      }
    case TOGGLE_THEME:
      return {
        theme: !state.theme
      }
    default:
      return state
  }
}