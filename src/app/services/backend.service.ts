import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, subscribeOn } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Warehouse } from '../models/warehouse';
import { Inventory } from '../models/inventory';
import { Product } from '../models/product';





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

  getAllSizes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'p/sizes/all',
                              { observe: 'response' });
  }
  getAllProducts(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'p/all',
                              { observe: 'response' });
  }

  getAllManufacturers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'p/manus/all',
                              { observe: 'response' });
  }

  getAllCategories(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'p/cats/all',
                              { observe: 'response' });
  }

  getAllCalibers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'p/cals/all',
                              { observe: 'response' });
  }
}
