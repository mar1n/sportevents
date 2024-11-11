import { setupWorker } from '../../node_modules/msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
