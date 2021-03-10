import React from 'react'

import { useInputs, useSubmit } from '../../helpers/hooks'

import { validateSynthesys } from '../../helpers/validators'

import { HowProduced, EditSectionProps, SectionType } from '../../types'
import { HandleEdit, ValidateEdit } from '../../types/functions'


const Production: React.FC<EditSectionProps<HowProduced | undefined>> = ({ content, page, handleSubmit }) => {
  const inputs = useInputs('synthesys', { ...content, textMaxLen: 600, textMinLen: 50 })

  const { bgImage, bgImageHeight, bgImageWidth, sectionName, title, text } = inputs

  const { button, errorLog } = useSubmit(
    handleSubmit as HandleEdit<SectionType>, 
    validateSynthesys as ValidateEdit<SectionType>,
    { summary: text, title, bgImage, sectionName, bgImageHeight, bgImageWidth }
  )

  const { bgImageComponent, bgImageHeightComponent, bgImageWidthComponent, textComponent, titleComponent, sectionNameComponent } = inputs

  return(
    <div id="form-section">
      <h2>{ `Information of ${page}` }</h2>
      { bgImageComponent }
      { bgImageWidthComponent }
      { bgImageHeightComponent }
      { sectionNameComponent }
      { titleComponent }
      { textComponent }
      { errorLog }
      { button }
    </div>
  )
}

export default React.memo(Production)