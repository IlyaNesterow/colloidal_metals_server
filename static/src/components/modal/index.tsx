import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../../redux/selectors'
import Container from '../../styles/modal'
import CloseBtn from './CloseBtn'


const Modal: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  const { theme } = useSelector(getAppInfo)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return(
    <Container darkTheme={ theme }>
      <div id="centred">
        { children }
      </div>
      <CloseBtn/>
    </Container>
  )
}

export default React.memo(Modal)