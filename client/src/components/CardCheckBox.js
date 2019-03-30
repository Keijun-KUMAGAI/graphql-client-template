import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types'

function CardCheckBox(props) {
  const { label, checked, handleClick } = props
  return (
    <div>
      <Checkbox checked={checked} onChange={() => handleClick()} />
      {label}
    </div>
  )
}

CardCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

CardCheckBox.defaultProps = {
  checked: false,
}

export default CardCheckBox
