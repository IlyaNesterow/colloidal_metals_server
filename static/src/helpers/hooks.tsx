import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useSelector } from 'react-redux'
import { getAppInfo } from '../redux/selectors'
import { DivOnClick } from '../types/functions'


interface PropsForUseLoadingButton {
  label: string
  onClick: DivOnClick
  component: React.FC
  id: string
}

export const useLoadingButton: (props: PropsForUseLoadingButton) => [ JSX.Element ] = ({ 
  label, onClick, component, id 
}) => {
  const { loading } = useSelector(getAppInfo)
  const [ buttonLbl, setButtonLbl ] = useState<string | React.FC>(label)

  useEffect(() => {
    loading 
      ? setButtonLbl(component)
      : setButtonLbl(label)
  }, [ loading, label, component ])

  const output = (
    <div 
      id={ id }
      onClick={ onClick }
      className="no-select"
    >
      { buttonLbl }
    </div>
  )

  return [ output ]
}

type TransformHook = (moveX?: boolean, moveY?: boolean) => {
  transformX: number
  transformY: number 
  currentY: number
  currentX: number
  setCurrentX: React.Dispatch<React.SetStateAction<number>>
  setCurrentY: React.Dispatch<React.SetStateAction<number>>
}

export const useTransforms: TransformHook = (moveX, moveY) => {
  const [ currentX, setCurrentX ] = useState<number>(0)
  const [ currentY, setCurrentY ] = useState<number>(0)

  const [ width, setWidth ] = useState<number>(window.innerWidth)
  const [ height, setHeight ] = useState<number>(window.innerHeight)

  const [ transformX, setTransformX ] = useState<number>(0)
  const [ transformY, setTransformY ] = useState<number>(0)

  type UpdateTransforms = () => void

  const updateTransforms: UpdateTransforms = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', updateTransforms)
    return () => window.removeEventListener('resize', updateTransforms)
  })

  useEffect(() => {
    if(moveX) setTransformX(width * currentX)
  }, [ currentX, width, moveX ])

  useEffect(() => {
    if(moveY) setTransformY(height * currentY)
  }, [ currentY, height, moveY ])

  if(!moveX && !moveY) throw new Error('Either moveX or moveY should be true')

  return { transformX, transformY, currentX, currentY, setCurrentX, setCurrentY }
}

interface GenericIdentityFn<T> {
  (arg: T, delay: number): T;
}

export const useDelay: GenericIdentityFn<any> = (arg, delay) => {
  const [ newValue, setNewValue ] = useState<any>(arg)

  useEffect(() => {
    setTimeout(() => setNewValue(arg), delay)
  }, [ arg, delay ])

  return newValue
}

type UseViewWithDelay = (delay: number) => {
  ref: React.Ref<HTMLDivElement | any>
  inView: boolean
}

export const useInViewWithDelay: UseViewWithDelay = (delay) => {
  const { ref, inView } = useInView()

  const _inView = useDelay(inView, delay)

  return { ref, inView: _inView }
}