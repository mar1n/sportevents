const setUrl = {
  production: process.env.NEXT_PUBLIC_SERVER_PROD,
  mockSerever: process.env.NEXT_PUBLIC_SERVER_MOCK,
  development: process.env.NEXT_PUBLIC_SERVER_DEV,
  selectDomainName: function (domainName: string) {
    if (domainName === 'production') {
      return this.production
    } else if (domainName === 'mockServer') {
      return this.mockSerever
    } else {
      return this.development
    }
  },
}

export { setUrl }
