import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommerceDto, FilterCommerce } from './commerce.dto';
import { Commerce } from './commerce.entity';

@Injectable()
export class CommerceService {
  constructor(@InjectModel(Commerce.name) private commerceModel: Model<Commerce>) { }

  async add(user: any): Promise<any> {
    return Promise.resolve().then(() => {
      console.log('user added:', user);
    });
  }
  async create(payload: CreateCommerceDto): Promise<Commerce> {
    const newModel = new this.commerceModel(payload)
    const result = await newModel.save();
    return result
  }

  async findAll(params: FilterCommerce): Promise<Commerce[]> {
    return this.commerceModel.find().skip(params.page).limit(params.limit)
  }

  async count(): Promise<number> {
    const result = await this.commerceModel.countDocuments()
    return result
  }
}
