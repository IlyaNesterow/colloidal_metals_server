import React, { useState } from 'react'

import { useInputs, useSubmit } from '../../helpers/hooks'

import { validateOther } from '../../helpers/validators'

import { OtherSources, EditSectionProps, SectionType, Link } from '../../types'
import { HandleEdit, ValidateEdit } from '../../types/functions'
import Links from './Links'


const Other: React.FC<EditSectionProps<OtherSources | undefined>> = ({ content, page, handleSubmit }) => {
  const [ urls, setUrls ] = useState<Link[]>(content ? content.urls : [])
  
  const { titleComponent, sectionNameComponent, title, sectionName } = useInputs(
    'other sources', 
    { title: content?.title, sectionName: content?.sectionName }
  )

  const { button, errorLog } = useSubmit(
    handleSubmit as HandleEdit<SectionType>, 
    validateOther as ValidateEdit<SectionType>,
    { urls: urls, title, sectionName }
  )

  return(
    <div>
      <h2>{ `Other sources of ${page}` }</h2>
      { titleComponent }
      { sectionNameComponent }
      <Links
        links={ urls }
        setLinks={ setUrls }
        _key="sources"
      />
      { errorLog }
      { button }
    </div>
  )
}

export default React.memo(Other)