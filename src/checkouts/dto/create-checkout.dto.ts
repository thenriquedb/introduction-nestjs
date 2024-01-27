import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsPositive, ValidateNested, arrayNotEmpty, isNotEmpty } from "class-validator";

export class CheckoutItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  product_id: number;
}

export class CreateCheckoutDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  @ApiProperty({
    type: () => CheckoutItemDto,
    isArray: true
  })
  items: CheckoutItemDto[];
}
