import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Events extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare location: string

  @column()
  declare address: string

  @column({ columnName: 'userName' })
  declare userName: string

  @column.dateTime({ columnName: 'startEvent' })
  declare startEvent: DateTime

  @column.dateTime({ columnName: 'endEvent' })
  declare endEvent: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
