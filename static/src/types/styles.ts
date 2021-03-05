

export interface PropsWithTheme{
  darkTheme: boolean
}

export interface PropsWithTransformX{
  transformX: number
}

export interface PropsWithBgImg extends PropsWithTheme{
  bgImage?: string
}

export interface PropsWithResizableImg extends PropsWithBgImg{
  bgImageWidth?: number
  bgImageHeight?: number
}

export interface InfoLogProps extends PropsWithTheme {
  opacite: boolean
  visible: boolean
}

export interface MenuProps extends PropsWithTheme{
  opened: boolean
}

export interface PropsWithCurrentBool extends PropsWithTheme{
  current: boolean
}

export interface PropsWithCurrentNum extends PropsWithTheme{
  current: number
}