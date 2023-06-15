import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.backendURL;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}users/all`,
                              { observe: 'response' });
  }
}
