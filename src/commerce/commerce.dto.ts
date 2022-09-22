import { IsArray, Min, ArrayNotEmpty, IsBoolean, IsDateString, IsNumber, IsString, IsPositive, IsOptional } from "class-validator";

export class CreateCommerceDto {
  @IsString()
  commerce: string

  @IsString()
  cuit: string

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  concepts: string[]

  @IsNumber()
  balance: number

  @IsBoolean()
  active: boolean

  @IsDateString()
  lastSell: string
}

export class FilterCommerce {
  @IsOptional()
  @Min(0)
  page: number = 0

  @IsOptional()
  @IsPositive()
  limit: number = 10
}
