import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setError } from '../../redux/actions'
import { getAppInfo, getThemeInfo } from '../../redux/selectors'
import Container from '../../styles/errorMessage'
import { DivOnClick } from '../../types/functions'


const ErrorMessage: React.FC = () => {
  const dispatch = useDispatch()
  const { error } = useSelector(getAppInfo)
  const { theme } = useSelector(getThemeInfo)

  const [ mounted, setMounted ] = useState<boolean>(false)
  const [ display, setDisplay ] = useState<boolean>(false)

  useEffect(() => {
    const bool = Boolean(error)
    setDisplay(bool)
    mounted
      ? setTimeout(() => setMounted(bool), 500)
      : setMounted(bool)
  }, [ error, mounted, setDisplay, setMounted ])

  useEffect(() => {
    if(error) setTimeout(() => dispatch(setError(undefined)), 5000)
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
      setDisplay(false)
      setTimeout(() => setMounted(false), 500)
    }
  }

  const onClose: DivOnClick = () => 
    dispatch(setError(undefined))

  return(
    mounted 
      ? (
          <Container
            darkTheme={ theme }
            mounted={ display }
          >
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
      : null
  )  
}

export default ErrorMessage