import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo, getThemeInfo } from '../../../redux/selectors'
import Container from '../../../styles/menu'
import Content from './Content'


const Menu: React.FC = () => {
  const { menuOpened } = useSelector(getAppInfo)
  const { theme } = useSelector(getThemeInfo)

  useEffect(() => {
    document.body.style.overflow = menuOpened ? 'hidden' : 'unset'
  }, [ menuOpened ])

  return(
    <Container
      opened={ menuOpened }
      darkTheme={ theme }
    >
      <div id="tab">
        <Content/>
      </div>
      <div id="shadow"></div>
    </Container>
  )
}

export default Menu