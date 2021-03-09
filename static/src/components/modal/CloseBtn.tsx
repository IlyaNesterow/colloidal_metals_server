import React, { useEffect, useContext } from 'react'

import { CloseModalCtx } from '../../helpers/contexts'
import Container from '../../styles/closeModalBtn'


const CloseImgBtn: React.FC<any> = () => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown) 
  })

  const close = useContext(CloseModalCtx)

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.keyCode === 27) close()
  } 

  return(
    <CloseModalCtx.Consumer>
      {onClick => 
        <Container onClick={() => onClick()}>
          <div id="upper"></div>
          <div id="lower"></div>
        </Container>
      }
    </CloseModalCtx.Consumer>
  )
}

export default CloseImgBtn