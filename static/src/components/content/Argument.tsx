import React, { useState } from 'react'

import { useSingleElem } from '../../helpers/hooks'
import { Checkbox, TextInput } from './Inputs'

import { Argument, FormComponentProps } from '../../types'


const ArgumentComponent: React.FC<FormComponentProps<Argument>> = (props) => {
  const [ bold, setBold ] = useState<boolean>(props.elem.bold || false)
  const [ statement, setStatement ] = useState<string>(props.elem.statement)

  const { deleteBtn } = useSingleElem<Argument>({
    ...props, elem: { bold, statement }
  })

  return(
    <>
      <div id="flex-subsection">
        <TextInput
          label="Statement"
          value={ statement }
          onChange={(e) => setStatement(e.target.value)}
          min={ 30 }
          max={ 200 }
        />
        <Checkbox
          label="Bold text"
          checked={ bold }
          onChange={(e) => setBold(e.currentTarget.checked) }
        />
      </div>
      { deleteBtn }
    </>
  )
}

export default ArgumentComponent
