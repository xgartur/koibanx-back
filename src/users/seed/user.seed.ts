import { Command, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserSeed {
  constructor(private readonly userService: UsersService) { }

  @Command({ command: 'create:user', describe: 'create a user' })
  async create(
    @Option({
      name: 'u',
      describe: 'name of user',
      type: 'string',
      default: 'user',
      required: true
    })
    username: string,
    @Option({
      name: 'p',
      describe: 'name of user',
      type: 'string',
      default: '123',
      required: true
    })
    password: string
  ) {
    try {
      const hash = bcrypt.hashSync(password, 10);
      const commerce = await this.userService.create({
        username,
        password: hash
      });
      console.log(`🚀 user:${commerce.username} created`)

    } catch (e) {
      console.log("Error on created seed data")
      console.log(e)
    }
  }
}
