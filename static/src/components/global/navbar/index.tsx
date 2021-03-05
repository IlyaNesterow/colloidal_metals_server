import React from 'react'
import { useSelector } from 'react-redux'

import MenuToggler from './MenuToggler'
import AuthCtx from '../AuthCtx'
import Container from '../../../styles/navbar'
import { getAppInfo, getAuthInfo } from '../../../redux/selectors'


const Navbar: React.FC = () => {
  const { menuOpened, theme } = useSelector(getAppInfo)
  const { loggedIn } = useSelector(getAuthInfo)

  return(
    <Container
      darkTheme={ theme }
      opened={ menuOpened }
    >
      <AuthCtx/>
      { loggedIn && <MenuToggler/> }
    </Container>
  )
}

export default Navbar