import React from 'react'
import { isMobile } from 'react-device-detect' 
import { useSelector } from 'react-redux'

import { getAppInfo } from '../redux/selectors'
import { TextInput, NumberInput, UrlInput, TitleInput } from '../components/content/Inputs'

import { SectionType, FormComponentProps } from '../types'
import { HandleEdit, ValidateEdit } from '../types/functions'


interface UseElemsFromListReturnData<T>{
  updateElem: (elem: T, index: number) => void,
  deleteElem: (index: number) => void,
  addElem: JSX.Element
}

export const useElemsFromList = <T>(
  elems: T[], 
  setElems: React.Dispatch<React.SetStateAction<T[]>>, 
  _key: string,
  emptyObj: T
): UseElemsFromListReturnData<T> => {

  const updateElem = (item: T, index: number) => {
    const _elems = elems
    _elems[index] = item
    setElems(_elems)
  }

  const deleteElem = (index: number) => {
    const updatedElems = elems
    updatedElems.splice(index, 1)
    setElems([...updatedElems]) 
  }

  const addElem = React.createElement<React.HTMLAttributes<HTMLSpanElement>>('span', {
    onClick: () => setElems([ ...elems, emptyObj ]),
    children: `Add ${_key} 🪄`
  })

  return { deleteElem, updateElem, addElem }
}

interface PropsForUseLoadingButton {
  label: string
  onClick: React.MouseEventHandler<HTMLDivElement>
  component: React.FC
  id: string
}

export const useLoadingButton: (props: PropsForUseLoadingButton) => [ JSX.Element ] = ({ 
  label, onClick, component, id 
}) => {
  const { loading } = useSelector(getAppInfo)
  const [ buttonLbl, setButtonLbl ] = React.useState<string | React.FC>(label)

  React.useEffect(() => {
    loading 
      ? setButtonLbl(component)
      : setButtonLbl(label)
  }, [ loading, label, component ])


  const output = React.createElement<React.HTMLAttributes<HTMLDivElement>>('div', {
    className: 'no-select',
    id, onClick
  }, buttonLbl)

  return [ output ]
}

type UseHover = () => {
  element: React.Ref<HTMLDivElement | any>
  on: boolean
}

export const useHover: UseHover = () => {
  const [ on, setOn ] = React.useState<boolean>(false)

  const element = React.useRef<null | HTMLDivElement>(null)

  React.useEffect(() => {
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
  const [ bgImage, setBgImage ] = React.useState<string>(content.bgImage || '')
  const [ bgImageWidth, setBgImageWidth ] = React.useState<number>(content.bgImageWidth || 100)
  const [ bgImageHeight, setBgImageHeight ] = React.useState<number>(content.bgImageHeight || 100)
  const [ sectionName, setSectionName ] = React.useState<string>(content.sectionName || '')
  const [ title, setTitle ] = React.useState<string>(content.title || '')
  const [ text, setText ] = React.useState<string>(content.text || '')

  const titleComponent = React.createElement(TitleInput, { 
    label: `Title of ${section}`,
    value: title,
    onChange: (e) => setTitle(e.target.value) 
  })

  const textComponent = React.createElement(TextInput, {
    label: `An overview about ${section}`,
    value: text,
    onChange: (e) => setText(e.target.value),
    min: content.textMinLen || 40,
    max: content.textMaxLen || 600 
  })

  const sectionNameComponent = React.createElement(TitleInput, {
    label: "How you want Introduction section to be labeled",
    value: sectionName,
    onChange: (e) => setSectionName(e.target.value)
  })

  const bgImageComponent = React.createElement(UrlInput, {
    label: `URL for bacground image of ${section}`,
    value: bgImage,
    onChange: (e) => setBgImage(e.target.value),
    placeholder: "https://example.com/image.png"
  })

  const bgImageWidthComponent = React.createElement(NumberInput, {
    label:"Background Image Width",
    value: bgImageWidth, 
    min: 40, 
    max: 100,
    onChange: (e) => setBgImageWidth(parseFloat(e.target.value)) 
  })
  
  const bgImageHeightComponent = React.createElement(NumberInput, {
    label: "Background Image Height",
    value: bgImageHeight,
    min: 35,
    max: 100,
    onChange: (e) => setBgImageHeight(parseFloat(e.target.value))
  })

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
  const [ error, setError ] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    if(error) setTimeout(() => setError(undefined), 10000)
  }, [ error ])

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    const validation = validate(data)
    validation
      ? setError(validation)
      : func(data)
  }

  let errorLog: JSX.Element | null = null

  if(error){
    const p = React.createElement<React.HTMLAttributes<HTMLParagraphElement>>('p', { children: error })
    errorLog = React.createElement<React.HTMLAttributes<HTMLDivElement>>('div', {
      id: 'error',
      children: p
    })
  }

  const button = React.createElement<React.HTMLAttributes<HTMLDivElement>>('div', {
    id: 'lowest-btn',
    children: React.createElement<React.HTMLAttributes<HTMLButtonElement>>('button', {
      onClick: clickHandler,
      children: 'Submit'
    })
  })

  return { button, errorLog }
}

interface UseSingleElemReturnType{
  deleteBtn: JSX.Element
}

export const useSingleElem = <T>(
  args: FormComponentProps<T>
): UseSingleElemReturnType => {
  const { deleteItem, index, elem, onChange } = args

  React.useEffect(() => {
    onChange(elem, index)
  }, [ index, elem, onChange ])

  const deleteBtn = React.createElement<React.HTMLAttributes<HTMLSpanElement>>('span', {
    id: 'remove-smth',
    className: 'no-select',
    onClick: () => deleteItem(index),
    children: '🗑️'
  })

  return { deleteBtn }
}