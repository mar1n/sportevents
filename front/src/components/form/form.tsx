import React, { FC } from 'react'

interface formProps {
  formName: string
  children: React.ReactElement
  onClick(e: React.FormEvent): void
}

const Form: FC<formProps> = ({ children, formName, onClick }) => (
  <form aria-label={formName} onClick={onClick}>{children}</form>
)

export default Form
