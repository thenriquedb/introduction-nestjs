import { Injectable, Post } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { Checkout } from './entities/checkout.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

const PRODUCTS_LIST = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 100,
    category_id: 1,
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 200,
    category_id: 1,
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 300,
    category_id: 2,
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 400,
    category_id: 2,
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 500,
    category_id: 1,
  },
];

@Injectable()
export class CheckoutsService {
  constructor(@InjectRepository(Checkout) private checkoutRepository: Repository<Checkout>) { }

  async create(createCheckoutDto: CreateCheckoutDto) {
    const productsIds = PRODUCTS_LIST.map(product => product.id)
    const products = PRODUCTS_LIST.filter(product => productsIds.includes(product.id));

    const checkout = Checkout.create({
      items: createCheckoutDto.items.map(item => {
        const product = products.find(product => product.id === item.product_id);
        return {
          quantity: item.quantity,
          price: product.price,
          product: {
            name: product.name,
            description: product.description,
            product_id: product.id,
            image_url: product.image_url
          }
        }
      })
    });

    await this.checkoutRepository.save(checkout);

    return checkout;
  }

  findAll() {
    return this.checkoutRepository.find();
  }

  findOne(id: number) {
    return this.checkoutRepository.findOneByOrFail({ id });
  }

  async pay(id: number) {
    const checkout = await this.checkoutRepository.findOneByOrFail({
      id
    });

    checkout.pay();

    return this.checkoutRepository.save(checkout);
  }

  async fail(id: number) {
    const checkout = await this.checkoutRepository.findOneByOrFail({
      id,
    });

    checkout.fail();

    return this.checkoutRepository.save(checkout);
  }
}
