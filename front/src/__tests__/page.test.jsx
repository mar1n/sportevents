import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/home'

describe('Page', () => {
  it('films list', () => {
    render(<Home/>)
    
    const title = screen.getByText('Save and see your changes instantly.')
    expect(title).toBeInTheDocument()
  });
})