import React from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../../redux/selectors'
import Container from '../../styles/image'
import CopyURL from './CopyURL'
import OpeninModal from './OpenInModal'
import DeleteImage from './DeleteImg'

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
      <div id="image-controls">
        <DeleteImage clickHandler={ onClickOnDelete }/>
        <OpeninModal clickHandler={ onClickInModal }/>
        <CopyURL src={ src }/>
      </div>
    </Container>
  )
}

export default Image
