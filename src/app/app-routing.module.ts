import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'warehouse',
    component: WarehouseComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
