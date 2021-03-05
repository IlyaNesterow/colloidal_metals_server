import React from 'react'

export type InputOnChange = React.ChangeEventHandler<HTMLInputElement>

export type ButtonOnClick = React.MouseEventHandler<HTMLButtonElement>

export type DivOnClick = React.MouseEventHandler<HTMLDivElement>

export type SpanMouseEvent = React.MouseEventHandler<HTMLSpanElement>

export type HandleControlBarClick = (num: number) => void

export type HandleClickOnDeleteImg = (img: string) => void

export type HandleClickOnImageInModal = (img: string) => void