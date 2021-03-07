import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { setLoading, setError } from '../../redux/actions'
import Container from '../../styles/images'
import Image from './Image'
import { HandleClickOnDeleteImg } from '../../types/functions'
import Modal from '../modal'
import Loading from '../global/LoadingScene'
import ImageUpload from './UploadImage'

import { CloseModalCtx } from '../../helpers/contexts'


const Main: React.FC<any> = () => {
  const dispatch = useDispatch()

  const [ images, setImages ] = useState<string[]>([])
  const [ imageInModal, setImageInModal ] = useState<string | null>(null)
  const [ pickingNewImg, setPickingNewImg ] = useState<boolean>(false)

  interface FetchedImages {
    images?: string[]
    error?: string
  }

  useEffect(() => {
    dispatch(setLoading(true))
    fetch('/images/list', {
      method: 'PUT'
    })
      .then(res => res.json())
      .then((res: FetchedImages) => {
        if(res.error) throw new Error(res.error)
        if(res.images){
          setImages(res.images)
        }
      })
      .catch((err: Error) => dispatch(setError(err.message)))
      .finally(() => setTimeout(() => dispatch(setLoading(false)), 2000))
  }, [ dispatch ])

  interface DeleteImgResp {
    error?: string
    deleted?: boolean
  }

  const deleteImage: HandleClickOnDeleteImg = useCallback((imgToDelete) => {
    const name = imgToDelete.split('/images/')
    if(name.length > 1){
      dispatch(setLoading(true))
      fetch(`/images/delete_image/${name[name.length - 1]}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then((res: DeleteImgResp) => {
          console.log(res)
          if(res.error) throw new Error(res.error)
          if(res.deleted) setImages(images.filter(img => img !== imgToDelete))
        })
        .catch((err: Error) => dispatch(setError(err.message)))
        .finally(() => dispatch(setLoading(false)))
    }
  }, [ images, dispatch ])

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
    <>
      <Container>
        <h1>
          {
            images.length === 0
              ? 'There are no images in your S3 bucket'
              : 'Images in your S3 bucket'
          }
        </h1>
        <div id="images">
          { spawnImages }
        </div>
        <button 
          id="upload-img-btn"
          onClick={() => setPickingNewImg(true)}
        >Upload image</button>
        {imageInModal &&
          <CloseModalCtx.Provider value={() => setImageInModal(null)}>
            <Modal>
              <img
                id="img-in-modal"
                src={ imageInModal }
                alt="One of your pics from aws S3"
              />
            </Modal>
          </CloseModalCtx.Provider>
        }
        {pickingNewImg &&
          <CloseModalCtx.Provider value={() => setPickingNewImg(false)}>
            <Modal>
              <ImageUpload
                onSuccess={(url) => setImages([...images, url])}
              />
            </Modal>
          </CloseModalCtx.Provider>
        }
      </Container>
      <Loading/>
    </>
  )
}

export default Main