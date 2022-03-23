import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  selectedFile = null;

  user = {
    username: '',
    email: '',
    password: '',
    status: true,
    rol: 1,
    imgUrl: null,
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
    this.loading = true;
    // const user = this.user;

    if (!this.selectedFile) {
      this.registerUser(this.user);
      return;
    }

    this.userService
      .uploadImage(this.selectedFile)
      .pipe(first())
      .subscribe({
        next: (data) => {
          console.log(data);
          const { imgUrl } = data;
          this.user.imgUrl = imgUrl;
          const user = this.user;
          this.registerUser(user);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  registerUser(user: User) {
    this.userService.registerUser(user).subscribe({
      next: (data) => {
        this.loading = false;
        this.success = data.message;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error.message;
      },
    });
  }

  onFileSelected(event) {
    if (!event.target.files) return;

    const file = event.target.files[0];

    if (file.size > 3000000) {
      alert('File size is too big');
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
  }
}
