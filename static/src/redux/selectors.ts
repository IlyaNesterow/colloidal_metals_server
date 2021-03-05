import { RootState } from './'


export const getAppInfo = (state: RootState) => state.app
export const getThemeInfo = (state: RootState) => state.theme
export const getAuthInfo = (state: RootState) => state.auth