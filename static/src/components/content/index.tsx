import React from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../../redux/selectors'
import Container from '../../styles/content'


const Main: React.FC<any> = () => {
  const { theme } = useSelector(getAppInfo)

  return(
    <Container darkTheme={ theme }>

    </Container>
  )
}

export default Main