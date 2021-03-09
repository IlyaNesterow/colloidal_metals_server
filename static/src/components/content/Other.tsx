import React, { useState, useCallback } from 'react'

import { TitleInput, UrlInput } from './Inputs'

import { OtherSources, EditSectionProps, Link } from '../../types'


const Other: React.FC<EditSectionProps<OtherSources | undefined>> = ({ content, section }) => {
  const [ sectionName, setSectionName ] = useState<string>(
    content
      ? content.sectionName
      : ''
  )
  const [ urls, setUrls ] = useState<Link[]>(
    content
      ? content.urls
      : []
  )
 
  const urlOnChange = useCallback((url: Link, e: React.FormEvent<HTMLInputElement>) => {
    setUrls([
      ...urls.filter(v => (v.url !== url.url)),
      { 
        ...url,
        _name: url._name
      }
    ])
  }, [ urls ])

  const nameOnChange = useCallback((url: Link, e: React.FormEvent<HTMLInputElement>) => {
    setUrls([
      ...urls.filter(v => (v.url !== url.url)),
      { 
        ...url,
        _name: url._name
      }
    ])
  }, [ urls ])

  const deleteUrl = useCallback((index: number) => {
    const updatedSellers = urls
    updatedSellers.splice(index, 1)
    setUrls([...updatedSellers]) 
  }, [ urls ])

  return(
    <div>
      <h2>{ `Other sources of ${ section }` }</h2>
      <TitleInput
        label="How you want sources section to be labeled"
        value={ sectionName }
        onChange={(e) => setSectionName(e.currentTarget.value)}
      />
      {
        urls.map((u, index) => (
          <div 
            id="url-description"
            key={ u.url + index }
          >
            <UrlInput
              label="URL"
              value={ u.url }
              placeholder="https://seller.com"
              onChange={(e) => urlOnChange(u, e as React.FormEvent<HTMLInputElement>)}
            />
            <TitleInput
              label="Label"
              value={ u._name }
              placeholder="Vasya Pupkin"
              onChange={(e) => nameOnChange(u, e as React.FormEvent<HTMLInputElement>) }
            />
            <span 
              id="remove-smth"
              className="no-select"
              onClick={() => deleteUrl(index)}
            >🗑️</span>
          </div>
        ))
      }
      <span
        onClick={() => {
          setUrls([
            ...urls,
            { _name: '', url: '' }
          ])
        }}
      >Add URL</span>
    </div>
  )
}

export default React.memo(Other)