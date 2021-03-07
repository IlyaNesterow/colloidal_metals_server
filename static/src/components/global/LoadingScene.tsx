import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../../redux/selectors'
import Container from '../../styles/loading'


const LoadingScene: React.FC = () => {
  const { loading } = useSelector(getAppInfo)

  useEffect(() => {
    loading
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'unset'
  }, [ loading ])

  return(
    <Container _loading={ loading }>
      <div className="lds-hourglass"></div>
    </Container>
  )
}

export default LoadingScene