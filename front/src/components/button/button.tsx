import React, { FC } from 'react'

interface buttonProps {
  name: string
  className: string
  disabled?: boolean
  onClick?: () => void
}

const Button: FC<buttonProps> = ({ name, className, disabled, onClick }) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {name}
    </button>
  )
}

export default Button
