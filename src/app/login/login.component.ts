import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { PermissionLevel } from '../models/permission-level';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = new User(0, '', '', '', new PermissionLevel(0, ''));
  public isLoggedIn: boolean = false;
  displayLogin = false;
  errorMessage = '';

  url = environment.backendURL;

  constructor(public userService: UserService,
    private router: Router) {
      this.userService.user.subscribe(user => {
        this.isLoggedIn = true;
        // this.isLoggedIn = !!user; // User is logged in if user is not null
      });
  }

  logout(): void {
    this.userService.logout();
    this.displayLogin = true;
    this.router.navigate([]);
  }

  openLogin(): void {
    this.displayLogin = true;
  }

  onSubmit(loginForm: NgForm): void {
    this.userService.login(this.user).subscribe({
      next: (user) => {
        this.displayLogin = false;
        this.errorMessage = '';
        loginForm.resetForm();
      },
      error: error => {
        if (error.status === 401) {
          this.errorMessage = 'Wrong email and/or password';
        } else {
          this.errorMessage = 'An unknown error occurred';
        }
      }
    });
  }
}
