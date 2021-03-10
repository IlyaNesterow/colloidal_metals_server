import React from 'react'

import SingleLink from './SingleLink'
import { UrlInput, TitleInput } from './Inputs'

import { Link } from '../../types'

interface Props {
  links: Link[]
  _key: string
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>
}

const Links: React.FC<Props> = ({ links, _key, setLinks }) => {
  const addItem = (item: Link, index: number) => {
    const _links = links
    _links[index] = item
    setLinks(_links)
  }

  const deleteElem = (index: number) => {
    const updatedElems = links
    updatedElems.splice(index, 1)
    setLinks([...updatedElems]) 
  }

  return(
    <>
      {
        links.map((elem, index) => (
          <SingleLink
            key={ elem.url + index + 'elem' }
            _key={_key}
            elem={ elem }
            index={ index }
            deleteItem={ deleteElem }
            onChange={ addItem }
          />
        ))
      }
      <span 
        id="add-smth"
        className="no-select"
        onClick={() => 
          setLinks([
            ...links, 
            { url: '', _name: '' } 
          ])
        }
      >{`Add ${_key} 🪄`}</span>
    </>
  )
}

export default Links