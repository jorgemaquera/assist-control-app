import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/User';
import { SecureLsService } from './secure-ls.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'https://localhost:7016/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private secureLsService: SecureLsService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      this.secureLsService.getItem('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.authUrl}/authenticate`,
        { username, password },
        this.httpOptions
      )
      .pipe(
        map((user) => {
          this.secureLsService.setItem('currentUser', user);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    this.secureLsService.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
