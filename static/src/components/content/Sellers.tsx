import React, { useState, useCallback } from 'react'

import { NumberInput, TitleInput, UrlInput } from './Inputs'

import { Sellers, EditSectionProps, Link } from '../../types'


const SellersComponent: React.FC<EditSectionProps<Sellers>> = ({ content, section }) => {
  const [ bgImage, setBgImage ] = useState<string>(content.bgImage)
  const [ sectionName, setSectionName ] = useState<string>(content.sectionName)
  const [ bgImageWidth, setBgImageWidth ] = useState<number>(content.bgImageWidth || 100)
  const [ bgImageHeight, setBgImageHeight ] = useState<number>(content.bgImageHeight || 100)
  const [ sellers, setSellers ] = useState<Link[]>(content.sellers)
 
  const sellerUrlOnChange = useCallback((seller: Link, e: React.FormEvent<HTMLInputElement>) => {
    setSellers([
      ...sellers.filter(v => (v.url !== seller.url)),
      { 
        ...seller,
        _name: seller._name
      }
    ])
  }, [ sellers ])

  const sellerNameOnChange = useCallback((seller: Link, e: React.FormEvent<HTMLInputElement>) => {
    setSellers([
      ...sellers.filter(v => (v.url !== seller.url)),
      { 
        ...seller,
        _name: e.currentTarget.value
      }
    ])
  }, [ sellers ])

  const deleteSeller = useCallback((index: number) => {
    const updatedSellers = sellers
    updatedSellers.splice(index, 1)
    setSellers([...updatedSellers]) 
  }, [ sellers ])

  return(
    <div id="form-section">
      <h2>{ `Sellers of ${ section }` }</h2>
      <UrlInput
        label="Link to background image"
        value={ bgImage }
        onChange={(e) => setBgImage(e.currentTarget.value)}
        placeholder="https://example.com/image.png"
      />
      <NumberInput
        label="Background Image Width"
        value={ bgImageWidth }
        min={ 40 }
        max={ 100 }
        onChange={(e) => setBgImageWidth(parseFloat(e.target.value))}
      />
      <NumberInput
        label="Background Image Height"
        value={ bgImageHeight }
        min={ 35 }
        max={ 100 }
        onChange={(e) => setBgImageHeight(parseFloat(e.target.value))}
      />
      <TitleInput
        label="How you want Information section to be labeled"
        value={ sectionName }
        onChange={(e) => setSectionName(e.currentTarget.value)}
      />
      {
        sellers.map((s, index) => (
          <div 
            id="url-description"
            key={ s.url + index }
          >
            <UrlInput
              label="Link on the seller"
              value={ s.url }
              placeholder="https://seller.com"
              onChange={(e) => sellerUrlOnChange(s, e as React.FormEvent<HTMLInputElement>)}
            />
            <TitleInput
              label="Name of the seller"
              value={ s._name }
              placeholder="Vasya Pupkin"
              onChange={(e) => sellerNameOnChange(s, e as React.FormEvent<HTMLInputElement>) }
            />
            <span 
              id="remove-smth"
              className="no-select"
              onClick={() => deleteSeller(index)}
            >🗑️</span>
          </div>
        ))
      }
      <span
        onClick={() => {
          setSellers([
            ...sellers,
            { _name: '', url: '' }
          ])
        }}
      >Add seller</span>
    </div>
  )
}

export default React.memo(SellersComponent)