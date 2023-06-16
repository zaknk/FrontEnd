import { Component } from '@angular/core';
import { Product } from '../models/product';
import { UserService } from '../services/user.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  localProducts: Product[] = [];

  chosenProduct?: Product;
  displayProductDetails: boolean = false;

  constructor(private backendService: BackendService, public userService: UserService) {
    this.getAllProducts();
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
      }
    });
  }

  chooseProduct(product: Product): void {
    this.chosenProduct = product;
    this.displayProductDetails = true;
  }

  closeProductDetails(): void {
    this.displayProductDetails = false;
  }
}
