import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsPositive, ValidateNested, arrayNotEmpty, isNotEmpty } from "class-validator";

export class CheckoutItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  product_id: number;
}

export class CreateCheckoutDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}
