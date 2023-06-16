import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Warehouse } from '../models/warehouse';
import { Inventory } from '../models/inventory';

import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { Caliber } from '../models/caliber';
import { Manufacturer } from '../models/manufacturer';
import { Size } from '../models/size';
import { Category } from '../models/category';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  localWarehouses: any = [];
  localInventory: any = [];

  chosenInventory = new Inventory(
    0,
    new Warehouse(0, 0, 0),
    new Product(
      0,
      '',
      new Category(0, ''),
      new Manufacturer(0, ''),
      new Size(0, ''),
      new Caliber(0, ''),
      '',
      0,
      '',
      ''),
    0
  );

  constructor(private backendService: BackendService, private fb: FormBuilder) {
    this.getAllWarehouses();
    this.getAllInventory();
  }

  addForm = this.fb.group({
    warehouseId: ['', Validators.required],
    productId: ['', Validators.required],
    quantity: [
      '',
      Validators.compose([Validators.required, Validators.min(1)]),
    ],
  });

  get warehouseId() {
    return this.addForm.get('warehouseId');
  }

  get productId() {
    return this.addForm.get('productId');
  }

  get quantity() {
    return this.addForm.get('quantity');
  }

  getAllInventory(): void {
    this.localInventory = [];
    this.backendService.getAllInventory().subscribe((data) => {
      for (let inventory of data.body) {
        this.localInventory.push(
          new Inventory(
            inventory.inventoryId,
            new Warehouse(
              inventory.warehouse.warehouseId,
              inventory.warehouse.capacity,
              inventory.warehouse.active),
            new Product(
              inventory.product.productId,
              inventory.product.name,
              new Category(
                inventory.product.category.categoryId,
                inventory.product.caliber.caliberName),
              new Manufacturer(
                inventory.product.manufacturer.manufacturerId,
                inventory.product.manufacturer.manufacturerName),
              new Size(
                inventory.product.size.sizeId,
                inventory.product.size.sizeName),
              new Caliber(
                inventory.product.caliber.caliberId,
                inventory.product.caliber.caliberName),
              inventory.product.productDesc,
              inventory.product.available,
              inventory.product.imageURL,
              inventory.product.altText),
            inventory.quantity
          )
        );
      }
    });
  }

  getAllWarehouses(): void {
    this.localWarehouses = [];
    this.backendService.getAllWarehouses().subscribe({
      next: (data) => {
        for (let warehouse of data.body) {
          this.localWarehouses.push(
            new Warehouse(
              warehouse.warehouseId,
              warehouse.capacity,
              warehouse.active
            )
          );
        }
      },
      error: (errData) => {
        console.log(errData);
      },
      complete: () => console.log('Complete! All warehouses returned.'),
    });
  }

  deleteInventory(): void {
    console.log(this.chosenInventory);

    this.backendService
      .deleteInventoryById(this.chosenInventory)
      .subscribe(() => this.getAllWarehouses());

    this.addForm.reset();
  }
}
