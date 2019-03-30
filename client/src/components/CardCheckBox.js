import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

function CardCheckBox(props) {
  const { label, checked, handleClick } = props
  return (
    <div>
      <Checkbox checked={checked} onChange={() => handleClick()} />
      {label}
    </div>
  )
}

export default CardCheckBox
