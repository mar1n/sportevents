import React, { FC } from 'react'

interface formProps {
  formName: string
  children: React.ReactElement
  onSubmit(e: React.FormEvent): void
  className: string
}

const Form: FC<formProps> = ({ children, formName, onSubmit, className }) => (
  <form aria-label={formName} onSubmit={onSubmit} className={className}>{children}</form>
)

export default Form
