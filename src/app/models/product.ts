import { Caliber } from './caliber';
import { Category } from './category';
import { Manufacturer } from './manufacturer';
import { Size } from './size';

export class Product {
  productId: number = 0;
  name: string = '';
  categoryId: Category = new Category(0, '');
  manufacturerId: Manufacturer = new Manufacturer(0, '');
  sizeId: Size = new Size(0, '');
  caliberId: Caliber = new Caliber(0, '');
  productDesc: string = '';
  available: number = 0;
  imageURL: string = '';
  altText: string = '';

  constructor(
    productId: number,
    name: string,
    categoryId: Category,
    manufacturerId: Manufacturer,
    sizeId: Size,
    caliberId: Caliber,
    productDesc: string,
    available: number,
    imageURL: string,
    altText: string) {
    this.productId = productId;
    this.name = name;
    this.categoryId = categoryId;
    this.manufacturerId = manufacturerId;
    this.sizeId = sizeId;
    this.caliberId = caliberId;
    this.productDesc = productDesc;
    this.available = available;
    this.imageURL = imageURL;
    this.altText = altText;
  }
}
