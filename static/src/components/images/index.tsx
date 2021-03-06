import React, { useState, useEffect, useCallback, useMemo } from 'react'

import Container from '../../styles/images'
import Image from './Image'
import { HandleClickOnDeleteImg } from '../../types/functions'
import Modal from '../modal'

import { CloseModalCtx } from '../../helpers/contexts'


const Main: React.FC<any> = () => {
  const [ images, setImages ] = useState<string[]>([])
  const [ imageInModal, setImageInModal ] = useState<string | null>(null)
  //const [ pickingNewImg, setPickingNewImg ] = useState<boolean>(false)

  useEffect(() => {
    fetch('/images/list', {
      method: 'PUT'
    })
      .then(res => res.json())
      .then(res => {
        if(res.images){
          setImages(res.images)
        }
      })
    //setImages(['https://calloid-metals-content-temporary.s3.eu-west-2.amazonaws.com/images/victoriano-izquierdo-NB4p_rcjZvg-unsplash.jpg', 'https://static.dw.com/image/56331487_303.jpg'])
  }, [])

  const deleteImage: HandleClickOnDeleteImg = useCallback((imgToDelete) => {
    //setImages(images.filter(img => img !== imgToDelete))
    /* call to API */
    const name = imgToDelete.split('/images/')
    if(name.length > 1){
      fetch(`/images/delete_image/${name[name.length - 1]}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setImages(images.filter(img => img !== imgToDelete))
        })
    }
  }, [ images ])

  const spawnImages = useMemo(() => 
    images.length > 0
      ? images.map((img, index) => (
          <Image
            src={ img }
            key={ img + index }
            onClickOnDelete={() => deleteImage(img)}
            onClickInModal={() => setImageInModal(img)}
          />
        )) 
      : null
  , [ images, deleteImage ])

  return(
    <Container>
      { spawnImages }
      {imageInModal &&
        <CloseModalCtx.Provider value={() => setImageInModal(null)}>
          <Modal>
            <img
              src={ imageInModal }
              alt="One of your pics from aws S3"
            />
          </Modal>
        </CloseModalCtx.Provider>
      }
    </Container>
  )
}

export default Main