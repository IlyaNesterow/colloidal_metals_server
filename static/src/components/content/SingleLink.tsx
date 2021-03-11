import React, { useState } from 'react'

import { useSingleElem } from '../../helpers/hooks'
import { UrlInput, TitleInput } from './Inputs'

import { Link, FormComponentProps } from '../../types'

interface Props extends FormComponentProps<Link> {
  _key: string
}

const SingleLink: React.FC<Props> = ({ elem, _key, index, deleteItem, onChange }) => {
  const [ url, setUrl ] = useState<string>(elem.url)
  const [ name, setName ] = useState<string>(elem._name)

  const { deleteBtn } = useSingleElem<Link>({
    index, deleteItem, onChange,
    elem: {
      url,
      _name: name
    }
  })

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
      { deleteBtn }
    </div>
  )
}

export default SingleLink