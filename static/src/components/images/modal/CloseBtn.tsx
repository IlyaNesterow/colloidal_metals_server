import React from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../../../redux/selectors'
import { CloseModalCtx } from '../../../helpers/contexts'
import Container from '../../../styles/closeModalBtn'

const CloseImgBtn: React.FC<any> = () => {
  const { theme } = useSelector(getAppInfo)

  return(
    <CloseModalCtx.Consumer>
      {onClick => 
        <Container 
          darkTheme={ theme }
          onClick={() => onClick()}
        >
          <div id="upper"></div>
          <div id="lower"></div>
        </Container>
      }
    </CloseModalCtx.Consumer>
  )
}

export default CloseImgBtn