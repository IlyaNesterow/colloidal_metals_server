import React from 'react'

import Tooltip from '../../styles/tooltip'
import { useHover } from '../../helpers/hooks'

interface Props {
  clickHandler: React.MouseEventHandler<HTMLDivElement>
}

const OpenInModal: React.FC<Props> = ({ clickHandler }) => {
  const { element, on } = useHover()

  return(
    <div
      id="open-in-modal-btn"
      onClick={ clickHandler }
      ref={ element }
    >
      🔍
      <Tooltip 
        position="bottom"
        visible={ on }
        id="tooltip"
      >
          View in modal
      </Tooltip>
    </div>
  )
}

export default OpenInModal