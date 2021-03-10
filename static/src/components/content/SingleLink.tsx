import React, { useState, useEffect } from 'react'

import { UrlInput, TitleInput } from './Inputs'

import { Link } from '../../types'

interface Props {
  _key: string
  elem: Link
  index: number
  deleteItem: (i: number) => void
  onChange: (item: Link, index: number) => void
}

const SingleLink: React.FC<Props> = ({ elem, _key, index, deleteItem, onChange }) => {
  const [ url, setUrl ] = useState<string>(elem.url)
  const [ name, setName ] = useState<string>(elem._name)

  useEffect(() => {
    onChange({ url, _name: name }, index)
  }, [ url, name, index, onChange ])
  
  return(
    <div id="url-description">
      <UrlInput
        label={`Link ot the ${_key}`}
        value={ url }
        placeholder="https://example.com/blablabla"
        onChange={(e) => setUrl(e.target.value)}
      />
      <TitleInput
        label="Brief description"
        value={ name }
        placeholder="Something..."
        onChange={(e) => setName(e.target.value)}
      />
      <span 
        id="remove-smth"
        className="no-select"
        onClick={() => deleteItem(index)}
      >🗑️</span>
    </div>
  )
}

export default SingleLink