import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path:'',
    component: WarehouseComponent
  },
  {
      path: 'inventory',
      component: InventoryComponent
  },
  {
    path: '**',
    component: WarehouseComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
