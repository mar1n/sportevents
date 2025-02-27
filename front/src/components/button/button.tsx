import React, { FC } from 'react'

interface buttonProps {
  name: string
  className: string
  disabled?: boolean
}

const Button: FC<buttonProps> = ({ name, className, disabled }) => {
  return (
    <button className={className} disabled={disabled}>
      {name}
    </button>
  )
}

export default Button
