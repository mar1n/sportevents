import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { server } from '../msw/node'
import Home from '../pages/home'

describe('Page', () => {
  it('films list', () => {
    server.events.on('request:start', ({ request }) => {
      console.log('MSW intercepted:', request.method)
    })
    render(<Home/>)
    
    const title = screen.getByText('Save and see your changes instantly.')
    expect(title).toBeInTheDocument()
  });
})