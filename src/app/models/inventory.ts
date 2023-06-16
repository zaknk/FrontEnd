import { Caliber } from './caliber';
import { Category } from './category';
import { Manufacturer } from './manufacturer';
import { Product } from './product';
import { Size } from './size';
import { Warehouse } from './warehouse';

export class Inventory {
  inventoryId: number = 0;
  warehouseId: Warehouse = new Warehouse(0, 0, 0);
  categoryName: string = '';
  productId: Product = new Product(
    0,
    '',
    new Category(0, ''),
    new Manufacturer(0, ''),
    new Size(0, ''),
    new Caliber(0, ''),
    '',
    0,
    '',
    '');
  quantity: number = 0;

  constructor(
    inventoryId: number,
    warehouseId: Warehouse,
    categoryName: string,
    productId: Product,
    quantity: number) {
    this.inventoryId = inventoryId;
    this.warehouseId = warehouseId;
    this.categoryName = categoryName;
    this.productId = productId;
    this.quantity = quantity;
  }
}
