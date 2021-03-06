import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Container from '../../../styles/menu-content'
import { getAppInfo } from '../../../redux/selectors'
import { setMenuOpened } from '../../../redux/actions'
import { NavLinkGenerator } from './types'
import { Pages } from '../../../types'
import ExtraLinks from './ExtraNavlinks'


const Content: React.FC = () => {
  const { menuOpened, theme } = useSelector(getAppInfo)
  
  const dispatch = useDispatch()
  
  const [ rollDown, setRollDown ] = useState<boolean>(false) 

  useEffect(() => {
    menuOpened
      ? setTimeout(() => setRollDown(true), 150)
      : setRollDown(false)
  }, [ menuOpened ])
  
  const generateNavLinks: NavLinkGenerator = (links: string[]) => 
    <>
      {
        links.map(link => 
          <NavLink
            to={ link.startsWith('/') ? link : `/${link.trim()}` }
            className="menu-link"
            onClick={() => dispatch(setMenuOpened(false))}
            activeStyle={{
              color: '#888'
            }}
            key={ link }
          >
            { link.toUpperCase() }
          </NavLink>
        )
      }
    </>
  
  return(
    <Container 
      rollDown={ rollDown }
      darkTheme={ theme }
    >
      <div id="inner-container">
        { generateNavLinks(Pages) }
        <ExtraLinks/>
      </div>
    </Container>
  )
}

export default Content