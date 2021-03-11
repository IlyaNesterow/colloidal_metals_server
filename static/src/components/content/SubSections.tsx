import React from 'react'

import SubSectionComponent from './SubSection'
import { useElemsFromList } from '../../helpers/hooks'

import { SubSection } from '../../types'

interface Props {
  subsections: SubSection[]
  setSubsections: React.Dispatch<React.SetStateAction<SubSection[]>>
}

const SubSections: React.FC<Props> = ({ subsections, setSubsections }) => {
  const { addElem, updateElem, deleteElem } = useElemsFromList<SubSection>(
    subsections, setSubsections, 'subsection', 
    {
      bgImage: '',
      bgImageHeight: 100,
      bgImageWidth: 100,
      text: '',
      title: '',
      sectionName: '',
      _arguments: []
    }
  )
  
  return(
    <>
      {subsections && subsections.length > 0 &&
        subsections.map((s, index) => (
          <SubSectionComponent
            key={ index + 'subsection' }
            elem={ s }
            index={ index }
            deleteItem={ deleteElem }
            onChange={ updateElem }
          />
        ))
      }
      { addElem }
    </>
  )
}

export default SubSections