import React from 'react'

import { CloseModalCtx } from '../../helpers/contexts'
import Container from '../../styles/closeModalBtn'


const CloseImgBtn: React.FC<any> = () => (
  <CloseModalCtx.Consumer>
    {onClick => 
      <Container onClick={() => onClick()}>
        <div id="upper"></div>
        <div id="lower"></div>
      </Container>
    }
  </CloseModalCtx.Consumer>
)

export default CloseImgBtn