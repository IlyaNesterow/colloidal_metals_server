import React from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../../redux/selectors'
import Form from './Form'
import Container from '../../styles/loginpage'


const Main: React.FC = () => {
  const label = 'Sign In'

  const { theme } = useSelector(getAppInfo)
  
  return(
    <Container darkTheme={ theme }>
      <div id="content">
        <h1>{ label }</h1>
        <Form label={ label.toUpperCase() }/>
      </div>
    </Container>
  )
}

export default Main