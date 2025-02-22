import React, { FC } from 'react'

interface labelProps {
  name: string
  title: string
}

const Label: FC<labelProps> = ({ name, title }) => <label htmlFor={name}>{title}</label>

export default Label
