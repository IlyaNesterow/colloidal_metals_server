import React, { useRef, useState,  useEffect } from 'react'
import { useSelector } from 'react-redux'

import Eye from '../../resources/assets/Eye'
import Container from '../../styles/passwordField'
import { InputOnChange, DivOnClick } from '../../types/functions'
import { getThemeInfo } from '../../redux/selectors'

interface PwFieldProps {
  onChange: (val: string) => void
}

const PwField: React.FC<PwFieldProps> = ({ onChange }) => {
  const [ visible, setVisible ] = useState<boolean>(false)
  const [ text, setText ] = useState<string>('')

  const input = useRef<HTMLInputElement>(null)

  const { theme } = useSelector(getThemeInfo)

  useEffect(() => {
    if(input.current && text.length === 0) input.current.type = 'password'
  }, [ text ])

  const onChangeHandler: InputOnChange = (e) => {
    const { value } = e.target
    value.trim()
    setText(value)
    onChange(value)
  }

  const EyeOnClick: DivOnClick = () => {
    setVisible(!visible)
    if(input.current !== null){
      visible
        ? input.current.type = 'password'
        : input.current.type = 'text'
      input.current.focus()
    }
  }
  
  return(
    <Container
      visible={ visible }
      darkTheme={ theme }
    >
      <input 
        ref={ input }
        type="password"
        onChange={ onChangeHandler }
      />
      {text.length > 0 &&
        <Eye 
          id="eye"
          onClick={ EyeOnClick }
        />
      }
    </Container>
  )
}

export default PwField