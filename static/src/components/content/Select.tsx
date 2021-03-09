import React , { forwardRef, RefAttributes } from 'react'

interface Props{
  items: string[]
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

const Select: React.ForwardRefExoticComponent<Props & RefAttributes<HTMLSelectElement>> = 
forwardRef(({ items, onChange }, ref) => {
  return(
    <select 
      onChange={ onChange }
      ref={ ref }
    >
      <option></option>
      {
        items.map((s, i) => (
          <option 
            value={ s.toLowerCase() }
            key={ s + i }
          >
            { s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() }
          </option>
        )) 
      }
    </select>
  )
})

export default Select
