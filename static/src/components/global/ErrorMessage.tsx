import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setError } from '../../redux/actions'
import Container from '../../styles/errorMessage'
import { DivOnClick } from '../../types/functions'


const ErrorMessage: React.FC<{ error: string }> = ({ error }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      dispatch(setError(undefined))
      document.body.style.overflow = 'unset'
    }, 5000)

    return () => {
      document.body.style.overflow = 'unset'
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => handleKeyDown(e))
    return () => {
      document.removeEventListener('keydown', (e: KeyboardEvent) => handleKeyDown(e))
    }
  })

  const handleKeyDown: (e: KeyboardEvent) => void = (e) => {
    if(e.keyCode === 27) {
      dispatch(setError(undefined))
    }
  }

  const onClose: DivOnClick = () => dispatch(setError(undefined))

  return(
    <Container>
      <div id="inner-container">
        <div 
          id="close-error-log"
          onClick={ onClose }
        >
          <div id="close-error-log-cross"></div>
        </div>
        <h5>{ error }</h5>
      </div>
    </Container>
  )  
}

export default React.memo(ErrorMessage)