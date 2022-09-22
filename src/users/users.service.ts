import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async add(user: any): Promise<any> {
    return Promise.resolve().then(() => {
      console.log('user added:', user);
    });
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username })
  }
  async create(payload: CreateUserDto) {
    const user = new this.userModel(payload)
    return user.save()
  }
}
