import { Document, Types } from 'mongoose';

export interface Image extends Document {
  readonly id: string
  readonly url: string
  readonly home_id: string
}
