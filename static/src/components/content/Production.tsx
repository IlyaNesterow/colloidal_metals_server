import React, { useState } from 'react'

import { NumberInput, TextInput, TitleInput, UrlInput } from './Inputs'

import { HowProduced, EditSectionProps } from '../../types'


const Production: React.FC<EditSectionProps<HowProduced | undefined>> = ({ content, section }) => {
  const [ bgImage, setBgImage ] = useState<string>(
    content 
      ? content.bgImage
      : ''
  )
  const [ sectionName, setSectionName ] = useState<string>(
    content
      ? content.sectionName
      : ''
  )
  const [ title, setTitle ] = useState<string>(
    content
      ? content.title 
          ? content.title
          : ''
      : '' 
  )
  const [ bgImageWidth, setBgImageWidth ] = useState<number>(
    content
      ? content.bgImageWidth
          ? content.bgImageWidth
          : 100
      : 100
  )
  const [ bgImageHeight, setBgImageHeight ] = useState<number>(
    content
      ? content.bgImageHeight
          ? content.bgImageHeight
          : 100
      : 100
  )
  const [ text, setText ] = useState<string>(
    content
      ? content.text
      : ''
  )

  return(
    <div id="form-section">
      <h2>{ `Information of ${ section }` }</h2>
      <UrlInput
        label="Link to background image"
        value={ bgImage }
        onChange={(e) => setBgImage(e.currentTarget.value)}
        placeholder="https://example.com/image.png"
      />
      <NumberInput
        label="Background Image Width"
        value={ bgImageWidth }
        min={ 40 }
        max={ 100 }
        onChange={(e) => setBgImageWidth(parseFloat(e.target.value))}
      />
      <NumberInput
        label="Background Image Height"
        value={ bgImageHeight }
        min={ 35 }
        max={ 100 }
        onChange={(e) => setBgImageHeight(parseFloat(e.target.value))}
      />
      <TitleInput
        label="How you want Information section to be labeled"
        value={ sectionName }
        onChange={(e) => setSectionName(e.currentTarget.value)}
      />
      <TitleInput
        label="Title e.g. Nanoparticles, platinum, etc"
        value={ title as string }
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <TextInput
        label="A brief summary"
        value={ text }
        onChange={(e) => setText(e.currentTarget.value)}
        min={ 50 }
        max={ 600 }
      />
    </div>
  )
}

export default React.memo(Production)