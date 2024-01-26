import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CheckoutItem } from "./checkout-item.entity";
import { CheckoutProduct } from "./checkout-product.entity";

export enum CheckoutStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED'
}

export type CreateCheckoutCommand = {
  items: {
    quantity: number;
    price: number;
    product: {
      name: string;
      image_url: string;
      description: string;
      product_id: number;
    }
  }[]
}

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  status: CheckoutStatus = CheckoutStatus.PENDING;

  @OneToMany(() => CheckoutItem, item => item.checkout, { eager: true, cascade: ['insert'] })
  items: CheckoutItem[];

  @CreateDateColumn()
  created_at: Date;

  static create(input: CreateCheckoutCommand) {
    const checkout = new Checkout();

    checkout.items = input.items.map(item => {
      const checkoutItem = new CheckoutItem();

      checkoutItem.price = item.price;
      checkoutItem.quantity = item.quantity;

      checkoutItem.product = new CheckoutProduct();
      checkoutItem.product.description = item.product.description;
      checkoutItem.product.image_url = item.product.image_url;
      checkoutItem.product.name = item.product.name;
      checkoutItem.product.product_id = item.product.product_id;

      return checkoutItem;
    });

    checkout.total = checkout.items.reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0);

    return checkout;
  }

  pay() {
    if (this.status === CheckoutStatus.PAID) {
      throw new Error('Checkout already paid');
    }

    if (this.status === CheckoutStatus.FAILED) {
      throw new Error('Checkout failed');
    }

    this.status = CheckoutStatus.PAID;
  }

  fail() {
    if (this.status === CheckoutStatus.FAILED) {
      throw new Error('Checkout failed');
    }

    if (this.status === CheckoutStatus.PAID) {
      throw new Error('Checkout already paid');
    }

    this.status = CheckoutStatus.FAILED;
  }
}
