import React, { useEffect, useRef, useState, useCallback, MouseEventHandler } from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../redux/selectors'

import { UrlInput, TitleInput, TextInput, NumberInput } from '../components/content/Inputs'

import { DivOnClick, HandleEdit, ValidateEdit } from '../types/functions'
import { SectionType } from '../types'


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

type UseHover = () => {
  element: React.Ref<HTMLDivElement | any>
  on: boolean
}

export const useHover: UseHover = () => {
  const [ on, setOn ] = useState<boolean>(false)

  const element = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if(element.current && !isMobile){
      element.current.addEventListener('mouseenter', () => setOn(true))
      element.current.addEventListener('mouseleave', () => setOn(false))
    }
  })

  return { on, element }
}

interface UseInputArgs {
  title?: string
  text?: string
  textMaxLen?: number
  textMinLen?: number
  bgImage?: string
  bgImageWidth?: number
  bgImageHeight?: number
  sectionName?: string
}

type UseInputs = (section: string, options: UseInputArgs) => {
  title: string, titleComponent: JSX.Element, 
  text: string, textComponent: JSX.Element,
  bgImage: string, bgImageComponent: JSX.Element,
  bgImageWidth: number, bgImageWidthComponent: JSX.Element,
  bgImageHeight: number, bgImageHeightComponent: JSX.Element,
  sectionName: string, sectionNameComponent: JSX.Element,
}

export const useInputs: UseInputs = (section, content) => {
  const [ bgImage, setBgImage ] = useState<string>(content.bgImage || '')
  const [ bgImageWidth, setBgImageWidth ] = useState<number>(content.bgImageWidth || 100)
  const [ bgImageHeight, setBgImageHeight ] = useState<number>(content.bgImageHeight || 100)
  const [ sectionName, setSectionName ] = useState<string>(content.sectionName || '')
  const [ title, setTitle ] = useState<string>(content.title || '')
  const [ text, setText ] = useState<string>(content.text || '')

  const titleComponent = (
    <TitleInput
      label={`Title of ${section}`}
      value={ title }
      onChange={(e) => setTitle(e.target.value)}
    />
  )

  const textComponent = (
    <TextInput
      label={`An overview about ${section}`}
      value={ text }
      onChange={(e) => setText(e.target.value)}
      min={ content.textMinLen || 40 }
      max={ content.textMaxLen || 600 }
    />
  )

  const sectionNameComponent = (
    <TitleInput
      label="How you want Introduction section to be labeled"
      value={ sectionName }
      onChange={(e) => setSectionName(e.target.value)}
    />
  )

  const bgImageComponent = (
    <UrlInput
      label={`URL for bacground image of ${section}`}
      value={ bgImage }
      onChange={(e) => setBgImage(e.target.value)}
      placeholder="https://example.com/image.png"
    />
  )

  const bgImageWidthComponent = (
    <NumberInput
      label="Background Image Width"
      value={ bgImageWidth }
      min={ 40 }
      max={ 100 }
      onChange={(e) => setBgImageWidth(parseFloat(e.target.value))}
    />
  )
  const bgImageHeightComponent = (
    <NumberInput
      label="Background Image Height"
      value={ bgImageHeight }
      min={ 35 }
      max={ 100 }
      onChange={(e) => setBgImageHeight(parseFloat(e.target.value))}
    />
  )

  return {
    title, text, sectionName, bgImage, bgImageHeight, bgImageWidth,
    titleComponent, textComponent, sectionNameComponent, bgImageComponent, bgImageWidthComponent, bgImageHeightComponent
  }
}

type UseSubmit = (
  submitHandler: HandleEdit<SectionType>, 
  validate: ValidateEdit<SectionType>,
  data: SectionType
) => {
  button: JSX.Element
  errorLog: JSX.Element | null
}

export const useSubmit: UseSubmit = (func, validate, data) => {
  const [ error, setError ] = useState<string | undefined>(undefined)

  useEffect(() => {
    if(error) setTimeout(() => setError(undefined), 10000)
  }, [ error ])

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    const validation = validate(data)
    validation
      ? setError(validation)
      : func(data)
  }

  const errorLog = (
    <>
      {
        error
          ? (
              <div id="error">
                <p>{ error }</p>
              </div>
            )
          : null
      }
    </>
  )

  const button = (
    <div id="lowest-btn">
      <button
        onClick={ clickHandler }
      >Submit</button>
    </div>
  )

  return { button, errorLog }
}