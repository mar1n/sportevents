import React, { FC } from 'react'

interface buttonProps {
  name: string
  onClick: () => void
  className: string
  disabled?: boolean
}

const Button: FC<buttonProps> = ({ name, className, onClick, disabled }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  )
}

export default Button
