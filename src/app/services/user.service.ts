import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { PermissionLevel } from '../models/permission-level';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  url: string = environment.backendURL;
  private loginUrl = `${this.url}users/login`;
  private rawUser = new BehaviorSubject<User | null>(null);

  user = this.rawUser.asObservable();

  constructor(private http: HttpClient) {}

  // login(user: User): Observable<User> {
  //   return this.http.post<User>(this.loginUrl, user).pipe(
  //     tap((user: User) => {
  //       this.rawUser.next(user);
  //     })
  //   );
  // }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user).pipe(
      tap((user: User) => {
        this.rawUser.next(user);
      })
    );
  }

  logout(): void {
    this.rawUser.next(null);
  }

  getAllUsers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}users/all`, { observe: 'response' });
  }
}
