import React, { useState } from 'react'

import { useInputs, useSubmit } from '../../helpers/hooks'
import { TitleInput, UrlInput, } from './Inputs'
import SubSections from './SubSections'

import { validateInformation } from '../../helpers/validators'

import { Info, EditSectionProps, PdfFile, SubSection, SectionType } from '../../types'
import { HandleEdit, ValidateEdit } from '../../types/functions'


const InfoComponent: React.FC<EditSectionProps<Info>> = ({ content, page, handleSubmit }) => {
  const { pdfFile, subSections } = content

  const [ PDFFile, setPdfFile ] = useState<PdfFile | undefined>(pdfFile)
  const [ subsections, setSubsections ] = useState<SubSection[]>(subSections || [])

  const inputs = useInputs('information', { 
    textMaxLen: 900, textMinLen: 40,
    text: content.summary, ...content 
  })

  const { bgImage, sectionName, title, text } = inputs

  const { button, errorLog } = useSubmit(
    handleSubmit as HandleEdit<SectionType>, 
    validateInformation as ValidateEdit<SectionType>,
    { summary: text, pdfFile: PDFFile, subSections: subsections, bgImage, sectionName, title }
  )

  const { bgImageComponent, sectionNameComponent, titleComponent, textComponent } = inputs

  return(
    <div id="form-section">
      <h2>{ `Information of ${page}` }</h2>
      { bgImageComponent }
      { sectionNameComponent }
      { titleComponent }
      { textComponent }
      <h3>PDF File</h3>
      {PDFFile 
        ? (
            <div id="flex-section">
              <TitleInput
                label="description"
                value={ PDFFile.description }
                onChange={(e) => setPdfFile({
                  ...PDFFile,
                  description: e.currentTarget.value
                })}
              />
              <UrlInput
                label="Link on PDF file"
                value={ PDFFile.url }
                onChange={(e) => setPdfFile({
                  ...PDFFile,
                  url: e.currentTarget.value
                })}
              />
              <TitleInput
                label="How you want this section to be named"
                value={ PDFFile.sectionName }
                onChange={(e) => setPdfFile({
                  ...PDFFile,
                  sectionName: e.currentTarget.value
                })}
              />
            </div>
          )
        : (
            <span
              onClick={() => setPdfFile({
                description: '',
                url: '',
                sectionName: ''
              })} 
            >Add PDF File</span>
          )
      }
      <SubSections
        subsections={ subsections }
        setSubsections={ setSubsections }
      />
      { errorLog }
      { button }
    </div>
  )
}

export default React.memo(InfoComponent)