import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getThemeInfo } from '../../redux/selectors'
import InfoLog from '../../styles/infoLog'

interface Props {
  visible: boolean
}

const Info: React.FC<Props> = ({ visible }) => {
  const { theme } = useSelector(getThemeInfo)

  const [ opacite, setOpacite ] = useState<boolean>(false)
  const [ higherZIndex, setHigherZIndex ] = useState<boolean>(false)

  useEffect(() => {
    setOpacite(visible)
    visible 
      ? setHigherZIndex(true)
      : setTimeout(() => setHigherZIndex(false), 50)
  }, [ visible ])

  return(
    <InfoLog
      opacite={ opacite }
      darkTheme={ theme }
      visible={ higherZIndex }
    >
      To login for being able to edit content of this webpage, you have to enter your username, and password
    </InfoLog>
  )
}

export default Info