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

  const close = useContext(CloseModalCtx)

  const input = useRef<null | HTMLInputElement>(null)
  const imgUrl = useRef<string>('')

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

    fetch('/images/get_presigned_url', {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((res: APIResp) => {
        if(res.error) throw new Error(res.error)
        if(!res.url) throw new Error('Url not found')

        return res.url
      })
      .then((url: string) => {
        if(file){
          imgUrl.current = url
          return fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type
            }
          })
        } else throw new Error('File not found')
      })
      .then(res => {
        if(res.ok) return 
        else throw new Error('Goaty refused')
      })
      .then(() => {
        onSuccess(imgUrl.current.split('?')[0])
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

export default React.memo(ImageUploader)

//https://calloid-metals-content-temporary.s3.amazonaws.com/images/madhur-chadha-syjMwInDTHI-unsplash.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUEI4YMWOSSZC2Y63%2F20210308%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210308T170720Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e9963d1b2e6551c1a76d05d350260b289eb8b7aa68c4aa01d9c0d03039542176