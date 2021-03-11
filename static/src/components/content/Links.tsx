import React from 'react'

import SingleLink from './SingleLink'
import { useElemsFromList } from '../../helpers/hooks'

import { Link } from '../../types'

interface Props {
  links: Link[]
  _key: string
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>
}

const Links: React.FC<Props> = ({ links, _key, setLinks }) => {
  const { deleteElem, updateElem, addElem } = useElemsFromList<Link>(
    links, setLinks, _key, 
    { url: '', _name: '' }
  )

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
            onChange={ updateElem }
          />
        ))
      }
      { addElem }
    </>
  )
}

export default Links