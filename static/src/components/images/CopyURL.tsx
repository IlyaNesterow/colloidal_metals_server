import React, { useState } from 'react'

import Tooltip from '../../styles/tooltip'


const CopyURL: React.FC<{ src: string }> = ({ src }) => {
  const [ copied, setCopied ] = useState<boolean>(false)

  const copyUrl = () => {
    const input = document.createElement('input')
    setCopied(true)
    document.body.appendChild(input)
    input.value = src
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    setTimeout(() => setCopied(false), 3000)
  }

  return(
    <div
      id="copy-image-url"
      onClick={ copyUrl }
    >
      🗳
      <Tooltip
        visible={ copied }
        position="top"
        borderColor="#ff3355"
        id="tooltip"
      >URL coppied
      </Tooltip>
    </div>
  )
}

export default CopyURL