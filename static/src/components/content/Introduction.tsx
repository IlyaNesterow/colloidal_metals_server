import React, { useState } from 'react'

import Links from './Links'
import { useInputs, useSubmit } from '../../helpers/hooks'

import { validateIntroduction } from '../../helpers/validators'

import { Introduction, EditSectionProps, SectionType, Link } from '../../types'
import { HandleEdit, ValidateEdit } from '../../types/functions'


const Intro: React.FC<EditSectionProps<Introduction>> = ({ content, page, handleSubmit }) => {
  const [ videos, setVideos ] = useState<Link[]>(content.videos || [])

  const inputs = useInputs('introduction', { ...content })

  const { bgImage, sectionName, title, text } = inputs

  const { button, errorLog } = useSubmit(
    handleSubmit as HandleEdit<SectionType>, 
    validateIntroduction as ValidateEdit<SectionType>,
    { videos: videos, text, title, bgImage, sectionName }
  )

  const { bgImageComponent, sectionNameComponent, titleComponent, textComponent } = inputs

  return(
    <div id="form-section">
      <h2>{ `Introduction of ${page}` }</h2>
      { bgImageComponent }
      { sectionNameComponent }
      { titleComponent }
      { textComponent }
      <h3>Videos</h3>
      <Links
        links={ videos }
        setLinks={ setVideos }
        _key="videos"
      />
      { errorLog }
      { button }
    </div>
  )
}

export default React.memo(Intro)