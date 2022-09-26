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
  private buildParams(params: FilterCommerce) {

    console.log(params)
    const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(params.like);
    let filter = {
      $and: [],
    }
    if (params.like) {
      filter.$and.push({
        $or: [
          { tempUserId: { $regex: searchRgx, $options: "i" } },
          { commerce: { $regex: searchRgx, $options: "i" } },
          { cuit: { $regex: searchRgx, $options: "i" } }
        ]
      })
    }
    if (params.active != undefined) {
      filter.$and.push({ active: params.active == "false" ? false : true })
    }
    if (!params.active && !params.like) {
      delete filter.$and
    }
    return filter
  }

  async findAll(params: FilterCommerce) {
    const filter = this.buildParams(params)
    // return this.commerceModel.find(filter).skip(params.page).limit(params.limit)
    return this.commerceModel.aggregate([
      {
        $addFields: {
          tempUserId: { $toString: '$_id' },
        }
      },
      {
        $match: filter
      },
      {
        $facet: {
          paginatedResults: [{ $skip: params.page }, { $limit: params.limit }],
          totalCount: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ]).exec();

  }

  async count(params: FilterCommerce): Promise<number> {
    const filter = this.buildParams(params)
    const result = await this.commerceModel.find(filter).countDocuments()
    return result
  }
}
