import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setMenuOpened } from '../../../redux/actions'
import { getAppInfo } from '../../../redux/selectors'

 
const MenuToggler: React.FC = () => {
  const { menuOpened } = useSelector(getAppInfo)
  const dispatch = useDispatch()

  return(
    <div 
      id="Menu"
      className={ menuOpened ? 'closed' : 'opened' }
      onClick={() => dispatch(setMenuOpened(!menuOpened))}
    >
      <div id="top"></div>
      <div id="middle"></div>
      <div id="bottom"></div>
    </div>
  )
}

export default MenuToggler