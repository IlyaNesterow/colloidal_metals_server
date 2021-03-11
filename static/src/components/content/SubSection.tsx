import React, { useState } from 'react'

import { useElemsFromList, useInputs, useSingleElem } from '../../helpers/hooks'
import ArgumentComponent from './Argument'

import { SubSection, Argument, FormComponentProps } from '../../types'


const SubSectionComponent: React.FC<FormComponentProps<SubSection>> = ({ elem, onChange, deleteItem, index }) => {
  const [ _arguments, setArguments ] = useState<Argument[]>(elem._arguments)

  const inputs = useInputs('subsection', { ...elem })

  const { bgImage, bgImageWidth, bgImageHeight, title, sectionName, text } = inputs

  const { 
    titleComponent, bgImageComponent, 
    sectionNameComponent, bgImageWidthComponent, 
    bgImageHeightComponent, textComponent
  } = inputs

  const { deleteBtn } = useSingleElem<SubSection>({
    onChange, deleteItem, index,
    elem: {
      bgImage, bgImageHeight, 
      bgImageWidth, title, 
      text, sectionName, _arguments
    }
  })

  const { deleteElem, updateElem, addElem } = useElemsFromList<Argument>(
    _arguments, setArguments, 'argument', { statement: '', bold: false }
  )
  
  return(
    <div id="flex-section">
      { titleComponent }
      { sectionNameComponent }
      { textComponent }
      { bgImageComponent }
      { bgImageWidthComponent }
      { bgImageHeightComponent }
      {
        _arguments.map((arg, index) => (
          <ArgumentComponent
            key={ arg.statement + index }
            onChange={ updateElem }
            deleteItem={ deleteElem }
            elem={ arg }
            index={index}
          />
        ))
      }
      { addElem }
      { deleteBtn }
    </div>
  )
}

export default SubSectionComponent