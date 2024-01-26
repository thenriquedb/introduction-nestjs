export class CheckoutItem {
  quantity: number;
  product_id: number;
}

export class CreateCheckoutDto {
  items: CheckoutItem[];
}
