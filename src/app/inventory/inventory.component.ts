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

  localCalibers:any = [];
  localCategories:any = [];
  localManufacturers:any = [];
  localProducts:any= [];
  localSizes:any= [];


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

  chosenProduct?: Product;

  displayProductDetails: boolean = false;


  constructor(private backendService: BackendService, private fb: FormBuilder) {
    this.getAllWarehouses();
    this.getAllInventory();
    this.getAllCalibers();
    this.getAllCategories();
    this.getAllManufacturers();
    this.getAllProducts();
    this.getAllSizes();
  }

  addForm = this.fb.group({
    warehouseId: ['', Validators.required],
    productId: ['', Validators.required],
    quantity: [
      '',
      Validators.compose([Validators.required, Validators.min(1)]),
    ],
    categoryName: ['', Validators.required],
    name: ['', Validators.required],
    caliberName: ['', Validators.required],
    manufacturerName: ['', Validators.required],
    sizeName: ['', Validators.required]
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
      for (let i of data.body) {
        this.localInventory.push(
          new Inventory(
            i.inventoryId,
            new Warehouse(i.warehouseId.warehouseId, i.warehouseId.capacity, i.warehouseId.active), new Product(i.productId.productId, i.productId.name, new Category(i.productId.categoryId.categoryId, i.productId.categoryId.categoryName), new Manufacturer(i.productId.manufacturerId.manufacturerId, i.productId.manufacturerId.manufacturerName), new Size(i.productId.sizeId.sizeId, i.productId.sizeId.sizeName), new Caliber(i.productId.caliberId.caliberId, i.productId.caliberId.caliberName), i.productId.productDesc, i.productId.available, i.productId.imageURL, i.productId.altText), i.quantity));
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

  getWarehouseById(): void {
    this.localWarehouses = [];
    this.backendService.getWarehouseById().subscribe({
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



  getAllCalibers(): void {
    this.localCalibers = [];
    this.backendService.getAllCalibers().subscribe({
      next: (data) => {
        for (let caliber of data.body) {
          this.localCalibers.push(
            new Caliber(
              caliber.caliberId,
              caliber.caliberName
            )
          );
        }
      },
      error: (errData) => {
        console.log(errData);
      },
      complete: () => console.log('Complete! All Calibers returned.'),
    });
  }

  getAllCategories(): void {
    this.localCategories = [];
    this.backendService.getAllCategories().subscribe({
      next: (data) => {
        for (let category of data.body) {
          this.localCategories.push(
            new Category(
              category.categoryId,
              category.categoryName
            )
          );
        }
      },
      error: (errData) => {
        console.log(errData);
      },
      complete: () => console.log('Complete! All categories returned.'),
    });
  }

  getAllManufacturers(): void {
    this.localManufacturers = [];
    this.backendService.getAllManufacturers().subscribe({
      next: (data) => {
        for (let manufacturer of data.body) {
          this.localManufacturers.push(
            new Manufacturer(
              manufacturer.manufacturerId,
              manufacturer.manufacturerName
            )
          );
        }
      },
      error: (errData) => {
        console.log(errData);
      },
      complete: () => console.log('Complete! All manufactures returned.'),
    });
  }

  getAllProducts(): void {
    this.localProducts = [];
    this.backendService.getAllProducts().subscribe({
      next: (data) => {
        for (let product of data.body) {
          this.localProducts.push(
            new Product(
              product.productId,
              product.name,
              product.categoryId,
              product.manufacturerId,
              product.sizeId,
              product.caliberId,
              product.productDesc,
              product.available,
              product.imageURL,
              product.altText
            )
          );
        }
      },
      error: (errData) => {
        console.log(errData);
      },
      complete: () => console.log('Complete! All products returned.'),
    });
  }

  getAllSizes(): void {
    this.localSizes = [];
    this.backendService.getAllSizes().subscribe({
      next: (data) => {
        for (let size of data.body) {
          this.localSizes.push(
            new Size(
              size.sizeId,
              size.sizeName
            )
          );
        }
      },
      error: (errData) => {
        console.log(errData);
      },
      complete: () => console.log('Complete! All sizes returned.'),
    });
  }

  deleteInventory(): void {
    console.log(this.chosenInventory);

    this.backendService
      .deleteInventoryById(this.chosenInventory)
      .subscribe(() => this.getAllWarehouses());

    this.addForm.reset();
  }

  chooseInventory(inventory: Inventory) :void {
    this.chosenInventory = inventory;
  }

  chooseProduct(product: Product) :void {     
    this.chosenProduct = product;  

  chooseProduct(product: Product) :void {
    this.chosenProduct = product;
    this.displayProductDetails = true;
  }

  cancelUpdate(): void {
      this.addForm.reset();
      this.chosenInventory = new Inventory(
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
  }

  closeLogin(): void {
    this.displayProductDetails = false;
  }
}
