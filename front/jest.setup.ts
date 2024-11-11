import 'whatwg-fetch'

import '@testing-library/jest-dom'

import { server } from './src/msw/node'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
