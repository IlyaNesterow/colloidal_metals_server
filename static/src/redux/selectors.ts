import { RootState } from './'


export const getAppInfo = (state: RootState) => state.app
export const getAuthInfo = (state: RootState) => state.auth