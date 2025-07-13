import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Events from './event.js'
export default class Attendee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'events_id' })
  declare eventsId: number
  @column()
  declare status: string

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  // Relationship to event
  @belongsTo(() => Events)
  public event!: BelongsTo<typeof Events>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
