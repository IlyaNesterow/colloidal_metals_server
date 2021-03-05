import React from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../../redux/selectors'
import Container from '../../styles/image'

import { DivOnClick } from '../../types/functions'

interface Props {
  src: string
  onClickOnDelete: DivOnClick
  onClickInModal: DivOnClick
}

const Image: React.FC<Props> = ({ src, onClickOnDelete, onClickInModal }) => {
  const { theme } = useSelector(getAppInfo)

  return(
    <Container darkTheme={ theme }>
      <img
        src={ src }
        alt="Your pic from aws S3"
      />
      <div 
        id="delete-btn"
        onClick={ onClickOnDelete }
      >🗑</div>
      <div
        id="open-in-modal-btn"
        onClick={ onClickInModal }
      >🔍</div>
    </Container>
  )
}

export default Image
