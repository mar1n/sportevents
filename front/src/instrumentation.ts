export async function register() {
  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NEXT_PUBLIC_ENABLE_MOCK_SERVICE_WORKER === 'true'
  ) {
    const { server } = await import('./msw/node')
    server.listen()

    console.log('[instrumentation][register] API mocking enabled, starting.')
  }
}
