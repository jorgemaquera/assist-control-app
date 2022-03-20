import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

// 9:40
export class LoginComponent implements OnInit {
  user: any = {
    username: '',
    password: '',
  };

  error: any;
  loading = false;

  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.user);
    this.loading = true;
    this.authService
      .login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          console.log(error);
          this.error = error.error.message;
          this.loading = false;
        },
      });
  }
}
