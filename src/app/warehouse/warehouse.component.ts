import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Warehouse } from '../models/warehouse';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {

  localWarehouses: any = [];

  chosenWarehouse: Warehouse = new Warehouse(0,0,0);
  formCapacity: number = 0;
  formActive: number = 0;

  canDelete: boolean = false;

  constructor(private backendService: BackendService, public userService: UserService) {
    this.getAllWarehouses();
  }

  getAllWarehouses(): void {
    this.localWarehouses = [];
    this.backendService.getAllWarehouses().subscribe(
      {
        next: data => {
          for (let warehouse of data.body) {
            this.localWarehouses.push(new Warehouse(warehouse.warehouseId,
                                              warehouse.capacity,
                                              warehouse.active));
          }
        },
        error: errData => {
          console.log(errData)
        }
      }
    );
  }

  addNewWarehouse(): void {
    this.backendService
        .addNewWarehouse(new Warehouse(0, Number(this.formCapacity), Number(this.formActive)))
        .subscribe(() => this.getAllWarehouses());
    this.clearForm();
  }

  deleteWarehouse(): void {

    console.log(this.chosenWarehouse);

    this.backendService.deleteWarehouseById(this.chosenWarehouse)
        .subscribe(() => this.getAllWarehouses());

    this.clearForm();
  }

  chooseWarehouse(warehouse: Warehouse): void {
   this.chosenWarehouse = warehouse;
   this.canDelete = true;

  }

  updateWarehouse(): void {
    this.backendService.updateWarehouse(new Warehouse(this.chosenWarehouse.warehouseId,
                                                this.formCapacity,
                                                Number(this.formActive)))
                       .subscribe(() => this.getAllWarehouses());

    this.clearForm();
  }

  clearForm(): void {
    this.chosenWarehouse = new Warehouse(0,0,0);
    this.formCapacity = 0;
    this.formActive = 0;
    this.canDelete = false;
  }


}
