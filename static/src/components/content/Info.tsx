import React, { useState, useCallback } from 'react'

import { useInputs, useSubmit } from '../../helpers/hooks'
import { NumberInput, TextInput, TitleInput, UrlInput, Checkbox } from './Inputs'

import { validateInformation } from '../../helpers/validators'

import { Info, EditSectionProps, PdfFile, SubSection, SectionType } from '../../types'
import { HandleEdit, ValidateEdit } from '../../types/functions'


const InfoComponent: React.FC<EditSectionProps<Info>> = ({ content, page, handleSubmit }) => {
  const { pdfFile, subSections } = content

  const [ PDFFile, setPdfFile ] = useState<PdfFile | undefined>(pdfFile)
  const [ subsections, setSubsections ] = useState<SubSection[] | undefined>(subSections)

  const inputs = useInputs('information', { 
    textMaxLen: 50, textMinLen: 60,
    text: content.summary, ...content 
  })

  const { bgImage, sectionName, title, text } = inputs

  const { button, errorLog } = useSubmit(
    handleSubmit as HandleEdit<SectionType>, 
    validateInformation as ValidateEdit<SectionType>,
    { summary: text, pdfFile: PDFFile, subSections: subsections, bgImage, sectionName, title }
  )

  const { bgImageComponent, sectionNameComponent, titleComponent, textComponent } = inputs

  const subsectionPropOnChange = useCallback((
      value: string, 
      index: number, 
      key: 'bgImage' | 'sectionName' | 'title' | 'bgImageWidth' | 'bgImageHeight'
    ) => {
    const updatedSubsections = subsections as SubSection[]
    key === 'bgImageWidth' || key === 'bgImageHeight'
      ? updatedSubsections[index][key] = parseFloat(value)
      : updatedSubsections[index][key] = value
    setSubsections([...updatedSubsections])
  }, [ subsections ])

  const subsectionArgOnChange = useCallback((
    value: string | boolean, 
    index1: number, 
    index2: number, 
    key: 'statement' | 'bold'
  ) => {
    const updatedSubsections = subsections as SubSection[]
    key === 'statement'
      ? updatedSubsections[index1]._arguments[index2][key] = value as string
      : updatedSubsections[index1]._arguments[index2][key] = value as boolean
    setSubsections([...updatedSubsections])
  }, [ subsections ])

  const addArgOnClick = useCallback((index: number) => {
    const updatedSubsections = subsections as SubSection[]
    updatedSubsections[index]._arguments = [
      ...updatedSubsections[index]._arguments, 
      {
        statement: '',
        bold: false
      }
    ]
    setSubsections([...updatedSubsections])
  }, [ subsections ])

  const addSubSection = useCallback(() => {
    const emptySubsection = {
      sectionName: '',
      bgImage: '',
      bgImageHeight: 100,
      bgImageWidth: 100,
      title: '',
      _arguments: []
    }
    subsections
      ? setSubsections([
          ...subsections, 
          emptySubsection
        ])
      : setSubsections([emptySubsection])
  }, [ subsections ])

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
      {subsections && subsections.length > 0 &&
        subsections.map((s, index) => (
          <div id="flex-section">
            <UrlInput
              label="Link to background image"
              value={ s.bgImage }
              onChange={(e) => subsectionPropOnChange(e.target.value, index, 'bgImage')}
              placeholder="https://example.com/image.png"
            />
            <NumberInput
              label="Background Image Width"
              value={ s.bgImageWidth || 100 }
              min={ 40 }
              max={ 100 }
              onChange={(e) => subsectionPropOnChange(e.target.value, index, 'bgImageWidth')}
            />
            <NumberInput
              label="Background Image Height"
              value={ s.bgImageHeight || 100 }
              min={ 35 }
              max={ 100 }
              onChange={(e) => subsectionPropOnChange(e.target.value, index, 'bgImageHeight')}
            />
            <TitleInput
              label="Name for subsection"
              value={ s.sectionName }
              onChange={(e) => subsectionPropOnChange(e.target.value, index, 'sectionName')}
            />
            <TitleInput
              label="Title"
              value={ s.title as string }
              onChange={(e) => subsectionPropOnChange(e.target.value, index, 'title')}
            />
            {s._arguments.length > 0 &&
              s._arguments.map((arg, _index) => (
                <div id="flex-subsection">
                  <TextInput
                    label="Statement"
                    value={ arg.statement }
                    onChange={(e) => subsectionArgOnChange(e.target.value, index, _index, 'statement')}
                    min={ 50 }
                    max={ 200 }
                  />
                  <Checkbox
                    label="Bold text"
                    checked={ arg.bold || false }
                    onChange={(e) => subsectionArgOnChange(e.currentTarget.checked, index, _index, 'statement')}
                  />
                </div>
              ))
            }
            <span
              onClick={() => addArgOnClick(index)}
            >Add argument</span>
          </div>
        ))
      }
      <span onClick={() => addSubSection()}>Add Subsection</span>
      { errorLog }
      { button }
    </div>
  )
}

export default React.memo(InfoComponent)