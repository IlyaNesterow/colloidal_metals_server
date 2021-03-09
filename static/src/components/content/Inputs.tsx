import React from 'react'

interface Props<T> {
  label: string 
  value: T
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

interface NumericInput extends Props<number> {
  min?: number
  max?: number
}

export const NumberInput: React.FC<NumericInput> = ({ min = 0, max = 0, label, ...props }) => {
  return(
    <div >
      <p className="no-select">{ label }</p>
      <input 
        type="number" 
        max={ max }
        min={ min }
        { ...props }
      />
    </div>
  )
}

interface UrlProps extends Props<string> {
  placeholder?: string
}

export const UrlInput: React.FC<UrlProps> = ({ label, placeholder = 'url', ...props }) => {
  return(
    <div>
      <p className="no-select">{ label }</p>
      <input 
        type="url" 
        placeholder={ placeholder }
        { ...props }
      />
    </div>
  )
}

interface TextAreaProps extends Props<string> {
  placeholder?: string
  min: number
  max: number
}

export const TextInput: React.FC<TextAreaProps> = ({ min, max, label, placeholder = '', ...props }) => {
  return(
    <div>
      <p className="no-select">{ label }</p>
      <textarea
        maxLength={ max }
        minLength={ min }
        { ...props }
      />
    </div>
  )
}

interface TitleProps extends Props<string> {
  placeholder?: string
}

export const TitleInput: React.FC<TitleProps> = ({ label, placeholder = '', ...props }) => {
  return(
    <div>
      <p className="no-select">{ label }</p>
      <input 
        type="text"
        placeholder={ placeholder }
        { ...props }
      />
    </div>
  )
}

interface CheckBoxProps {
  checked: boolean
  label: string
  onChange: React.FormEventHandler<HTMLInputElement>
}

export const Checkbox: React.FC<CheckBoxProps> = ({ label, ...props }) => {
  return(
    <div>
      <label htmlFor="input-checkbox">{ label }</label>
      <input
        id="input-checkbox"
        type="checkbox"
        { ...props }
      />
    </div>
  )
}