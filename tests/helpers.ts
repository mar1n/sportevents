import { BaseMail } from '@adonisjs/mail'

export default class VerifyEmail extends BaseMail {
  constructor(
    private user: any,
    private token: any
  ) {
    super()
  }

  prepare() {
    this.message
      .to(this.user.email)
      .from('szymondawidowicz@fastmail.com')
      .subject(`Verify your email`).html(`
        <h2>Verify your email</h2>
        <p>Hello ${this.user.username},</p>
        <p>Click the link below to verify your email:</p>
        <a href="http://localhost/activation/${this.token.value}">http://localhost/activation/${this.token.value}</a>
      `)
  }
}
