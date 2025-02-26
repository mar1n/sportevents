import React, { FC } from 'react'

interface formProps {
  formName: string
  children: React.ReactElement
  onClick(e: React.FormEvent): void
  className: string
}

const Form: FC<formProps> = ({ children, formName, onClick, className }) => (
  <form aria-label={formName} onClick={onClick} className={className}>{children}</form>
)

export default Form
