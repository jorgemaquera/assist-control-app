import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = {
    username: '',
    email: '',
    password: '',
    status: true,
    rol: 1,
  };

  success = '';
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.success = '';
    const user = this.user;
    console.log(user);
    this.loading = true;
    this.userService
      .registerUser(user)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.loading = true;
          this.success = data.message;
          // this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          this.error = error.error.message;
          this.loading = false;
        },
      });
  }
}
