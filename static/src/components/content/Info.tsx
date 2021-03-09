import React, { useState, useCallback } from 'react'

import { NumberInput, TextInput, TitleInput, UrlInput, Checkbox } from './Inputs'

import { Info, EditSectionProps, PdfFile, SubSection } from '../../types'


const InfoComponent: React.FC<EditSectionProps<Info>> = ({ content, section }) => {
  const [ bgImage, setBgImage ] = useState<string>(content.bgImage)
  const [ sectionName, setSectionName ] = useState<string>(content.sectionName)
  const [ title, setTitle ] = useState<string | undefined>(content.title)
  const [ summary, setSummary ] = useState<string>(content.summary)
  const [ pdfFile, setPdfFile ] = useState<PdfFile | undefined>(content.pdfFile)
  const [ subsections, setSubsections ] = useState<SubSection[] | undefined>(content.subSections)

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
      <h2>{ `Information of ${ section }` }</h2>
      <UrlInput
        label="Link to background image"
        value={ bgImage }
        onChange={(e) => setBgImage(e.currentTarget.value)}
        placeholder="https://example.com/image.png"
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
        value={ summary }
        onChange={(e) => setSummary(e.currentTarget.value)}
        min={ 50 }
        max={ 600 }
      />
      <h3>PDF File</h3>
      {pdfFile 
        ? (
            <div id="flex-section">
              <TitleInput
                label="description"
                value={ pdfFile.description }
                onChange={(e) => setPdfFile({
                  ...pdfFile,
                  description: e.currentTarget.value
                })}
              />
              <UrlInput
                label="Link on PDF file"
                value={ pdfFile.url }
                onChange={(e) => setPdfFile({
                  ...pdfFile,
                  url: e.currentTarget.value
                })}
              />
              <TitleInput
                label="How you want this section to be named"
                value={ pdfFile.sectionName }
                onChange={(e) => setPdfFile({
                  ...pdfFile,
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
    </div>
  )
}

export default React.memo(InfoComponent)