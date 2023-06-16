import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { PermissionLevel } from '../models/permission-level';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = new User(0, '', '', '', new PermissionLevel(0, ''));
  isLoggedIn: boolean = false;
  displayLogin = false;
  errorMessage = '';


  constructor(public userService: UserService) {
      this.userService.user.subscribe(user => {
        this.isLoggedIn = !!user; // User is logged in if user is not null
      });
  }

  logout(): void {
    this.userService.logout();
  }

  openLogin(): void {
    this.displayLogin = true;
  }

  closeLogin(): void {
    this.displayLogin = false;
  }

  onSubmit(loginForm: NgForm): void {
    this.userService.login(this.user).subscribe({
      next: (user) => {
        console.log('Login successful');
        console.log(user)
        this.closeLogin();
        this.errorMessage = '';
        loginForm.resetForm();
      },
      error: error => {
        console.log('Login failed');
        if (error.status === 401) {
          this.errorMessage = 'Wrong username and/or password';
        } else {
          this.errorMessage = 'An unknown error occurred';
        }
      }
    });
  }
}
