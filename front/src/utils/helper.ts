const setUrl = {
  production: process.env.NEXT_PUBLIC_SERVER_PROD,
  mockSerever: process.env.NEXT_PUBLIC_SERVER_MOCK,
  development: process.env.NEXT_PUBLIC_SERVER_DEV,
  getURL: function () {
    if (process.env.NEXT_PUBLIC_SELECT_SERVER === 'production') {
      return process.env.NEXT_PUBLIC_SERVER_PROD
    } else if (process.env.NEXT_PUBLIC_SELECT_SERVER === 'mockServer') {
      return process.env.NEXT_PUBLIC_SERVER_MOCK
    } else if (process.env.NEXT_PUBLIC_SELECT_SERVER === 'development') {
      return process.env.NEXT_PUBLIC_SERVER_DEV
    }
  },
}

export { setUrl }
