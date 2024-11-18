const setUrl = {
  production: 'UnKnown',
  mockSerever: 'http://localhost:6666',
  development: 'http://localhost:3001',
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
