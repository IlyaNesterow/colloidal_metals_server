import React, { useState, useContext, useRef, MouseEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setError, setLoading } from '../../redux/actions'
import { getAppInfo } from '../../redux/selectors'
import Container from '../../styles/imageUploader'
import { CloseModalCtx } from '../../helpers/contexts'

interface Props{
  onSuccess: (url: string) => void
}

const ImageUploader: React.FC<Props> = ({ onSuccess }) => {
  const { theme } = useSelector(getAppInfo)

  const dispatch = useDispatch()

  const [ image, setImage ] = useState<string>('')
  const [ name, setName ] = useState<string>('')
  const [ file, setFile ] = useState<File | null>(null)
  const [ url, setUrl ] = useState<string>('')

  const close = useContext(CloseModalCtx)

  const input = useRef<null | HTMLInputElement>(null)

  const onImgChange: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if(e.target.files) {
      setName(e.target.files[0].name)
      setImage(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
    }
  }

  const handleUploadSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    interface APIResp {
      error?: string
      url?: string
    }
    
    dispatch(setLoading(true))
    console.log(JSON.stringify({ name }))
    fetch('/images/get_presigned_url', {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((res: APIResp) => {
        console.log(res)
        if(res.error) throw new Error(res.error)
        if(!res.url) throw new Error('Url not found')

        return res.url
      })
      .then((url: string) => {
        setUrl(url.split('?')[0])
        return fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file?.type as string
          }
        })
      })
      .then(res => {
        if(res.ok) return 
        else throw new Error('S3 refused')
      })
      .then(res => {
        console.log(res)
        onSuccess(url)
      })
      .catch((err: Error) => dispatch(setError(err.message)))
      .finally(() => {
        dispatch(setLoading(false))
        close()
      })
  } 

  const removeAll: React.MouseEventHandler<HTMLDivElement> = () => {
    setFile(null)
    setImage('')
    setName('')
    if(input.current) input.current.value = ''
  }

  return(
    <Container>
      <div id="input-field">
        <label htmlFor="file-picker">
          Pick an image
        </label>
        <input 
          type="file" 
          id="file-picker"
          accept="image/png, image/jpg, image/jpeg"
          ref={ input }
          multiple={ false }
          onChange={ onImgChange }
        />
        {file && 
          <div 
            id="remove-file"
            onClick={ removeAll }
          >{ theme ? '🙅🏼‍♂️' : '🙅🏿‍♂️' }</div>
        }
      </div>
      {image.length > 0 &&
        <img 
          id="image-preview"
          src={ image }
          alt={ name }
        />
      }
      {file &&
        <button 
          onClick={ handleUploadSubmit }
        >Upload</button>
      }
    </Container>
  )
}

export default ImageUploader