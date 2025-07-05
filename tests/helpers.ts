import { BaseMail } from '@adonisjs/mail'

export default class VerifyEmail extends BaseMail {
  constructor(private user: any) {
    super()
  }

  prepare() {
    this.message
      .to(this.user.email)
      .from('szymondawidowicz@fastmail.com')
      .subject('Verify your email')
      .html('emails/verify_email')
  }
}
