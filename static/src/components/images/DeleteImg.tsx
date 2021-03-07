import React from 'react'

import Tooltip from '../../styles/tooltip'
import { useHover } from '../../helpers/hooks'

interface Props {
  clickHandler: React.MouseEventHandler<HTMLDivElement>
}

const DeleteImg: React.FC<Props> = ({ clickHandler }) => {
  const { element, on } = useHover()
  return(
    <div 
      id="delete-btn"
      onClick={ clickHandler }
      ref={ element }
    >
      🗑
      <Tooltip
        position="bottom"
        visible={ on }
        id="tooltip"
      >Delete image</Tooltip>
    </div>
  )
}

export default DeleteImg