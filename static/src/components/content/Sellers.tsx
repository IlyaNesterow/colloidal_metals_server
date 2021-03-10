import React, { useState } from 'react'

import { useInputs, useSubmit } from '../../helpers/hooks'
import Links from './Links'

import { validateSellers } from '../../helpers/validators'

import { Sellers, EditSectionProps, SectionType, Link } from '../../types'
import { HandleEdit, ValidateEdit } from '../../types/functions'


const SellersComponent: React.FC<EditSectionProps<Sellers>> = ({ content, page, handleSubmit }) => {
  const [ sellers, setSellers ] = useState<Link[]>(content.sellers)
  
  const inputs = useInputs('sellers', { ...content })

  const { bgImage, bgImageWidth, bgImageHeight, sectionName, title } = inputs

  const { button, errorLog } = useSubmit(
    handleSubmit as HandleEdit<SectionType>, 
    validateSellers as ValidateEdit<SectionType>,
    { sellers: sellers, title, bgImage, bgImageHeight, bgImageWidth, sectionName }
  )

  const { bgImageComponent, bgImageHeightComponent, bgImageWidthComponent, titleComponent, sectionNameComponent } = inputs

  return(
    <div id="form-section">
      <h2>{ `Sellers of ${ page }` }</h2>
      { bgImageComponent }
      { bgImageWidthComponent }
      { bgImageHeightComponent }
      { sectionNameComponent }
      { titleComponent }
      <h3>Sellers</h3>
      <Links
        _key="seller"
        links={ sellers }
        setLinks={ setSellers }
      />
      { errorLog }
      { button }
    </div>
  )
}

export default SellersComponent