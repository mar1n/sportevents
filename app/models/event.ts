import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Attendee from './attendee.js'
import User from './user.js'
export default class Events extends BaseModel {
  @hasMany(() => Attendee)
  declare attendees: HasMany<typeof Attendee>

  @manyToMany(() => User, {
    pivotTable: 'attendees',
    localKey: 'id', // Events.id
    relatedKey: 'id', // Users.id
    pivotForeignKey: 'events_id', // column in attendees
    pivotRelatedForeignKey: 'user_id', // column in attendees
  })
  declare users: ManyToMany<typeof User>

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
