import React, { FC } from 'react'

interface labelProps {
  name: string
  title: string
  className: string
}

const Label: FC<labelProps> = ({ name, title, className }) => <label className={className} htmlFor={name}>{title}</label>

export default Label
