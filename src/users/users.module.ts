import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSeed } from './seed/user.seed';
import { User, UserSchema } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [UsersService, UserSeed],
  exports: [UsersService]
})
export class UsersModule { }
