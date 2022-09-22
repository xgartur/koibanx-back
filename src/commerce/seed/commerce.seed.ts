import { Command, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CommerceService } from '../commerce.service';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs'


@Injectable()
export class CommerceSeed {
  constructor(private readonly commerceService: CommerceService) { }

  @Command({ command: 'create:commerce', describe: 'create a commerce' })
  async create(
    @Option({
      name: 'n',
      describe: 'number of commerce to create',
      type: 'number',
      default: 10,
      required: false
    })
    n: number
  ) {
    try {
      for (let index = 0; index < n; index++) {
        const commerce = await this.commerceService.create({
          commerce: faker.company.name(),
          concepts: [faker.word.adjective()],
          cuit: faker.lorem.word(),
          balance: parseInt(faker.finance.amount(30, 200)),
          active: faker.helpers.arrayElement([true, false]),
          lastSell: dayjs(faker.date.between('2022-01-01T00:00:00.000Z', '2022-10-01T00:00:00.000Z')).toISOString()
        });
        console.log(commerce);
      }
      console.log(`🚀 ${n} commerce created`)

    } catch (e) {
      console.log("Error on created seed data")
      console.log(e)
    }
  }
}
