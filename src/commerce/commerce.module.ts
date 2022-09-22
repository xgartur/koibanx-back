import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Commerce, CommerceSchema } from './commerce.entity';
import { CommerceSeed } from './seed/commerce.seed';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Commerce.name,
      schema: CommerceSchema
    }
  ])],
  providers: [CommerceService, CommerceSeed],
  controllers: [CommerceController]
})
export class CommerceModule { }
