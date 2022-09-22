import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommercePresenter, CommercesPresenter } from 'src/@core/presenter/commerce.presenter';
import { commercePresenter, commercesPresenter } from 'src/shared/presenter';
import { CreateCommerceDto, FilterCommerce } from './commerce.dto';
import { CommerceService } from './commerce.service';

@Controller('api/store')
export class CommerceController {
  constructor(private commerceService: CommerceService) {
  }

  @UseGuards(AuthGuard('local'))
  @Get()
  async getAll(@Query() params: FilterCommerce): Promise<CommercesPresenter> {
    const { page, limit } = params
    const data = await this.commerceService.findAll(params)
    const total = await this.commerceService.count()
    return {
      data: commercesPresenter(data),
      page,
      pages: Math.floor(total / limit),
      limit,
      total,
    }
  }
  @Post()
  async create(@Body() payload: CreateCommerceDto): Promise<CommercePresenter> {
    const commerce = await this.commerceService.create(payload)
    return commercePresenter(commerce)
  }
}
