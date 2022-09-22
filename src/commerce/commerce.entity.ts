import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Commerce extends Document {
  @Prop({ required: true })
  commerce: string

  @Prop()
  concepts: string[]

  @Prop()
  cuit: string

  @Prop({ type: Number })
  balance: number

  @Prop({ type: Boolean })
  active: boolean

  @Prop()
  lastSell: string
}

export const CommerceSchema = SchemaFactory.createForClass(Commerce)


