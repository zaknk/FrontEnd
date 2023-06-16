import { Injectable } from '@angular/core';
// must import HTTP functionality here in the service
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, subscribeOn } from 'rxjs';
// importing the environment object for use here
import { environment } from 'src/environments/environment';
import { Warehouse } from '../models/warehouse';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url: string = environment.backendURL;

  constructor(private http: HttpClient) { }

  getAllWarehouses(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'warehouse/all',
                              { observe: 'response' });
  }

  getWarehouseById(warehouseId: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'warehouse/' + warehouseId,
                              { observe: 'response' });
  }

  deleteWarehouseById(warehouse: Warehouse): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.url}warehouse/del/${warehouse.warehouseId}`,
                                 { observe: 'response' });
  }

  updateWarehouse(warehouse: Warehouse): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.url + 'warehouse/upd', warehouse, { observe: 'response' });
  }

  getAllInventory(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'inv/all',
                              { observe: 'response' });
  }

  deleteInventoryById(inventory: Inventory): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.url}warehouse/del/${inventory.inventoryId}`,
                                 { observe: 'response' });
  }

  addNewWarehouse(warehouse: Warehouse): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.url + 'warehouse/new', warehouse, { observe: 'response' });
  }

  addWarehouseInBody(warehouse: Warehouse): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.url + 'warehouse/new', warehouse, { observe: 'response' });
  }


}
