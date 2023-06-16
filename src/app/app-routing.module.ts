import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseComponent } from './warehouse/warehouse.component';

const routes: Routes = [
  {
    path:'',
    component: WarehouseComponent
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
