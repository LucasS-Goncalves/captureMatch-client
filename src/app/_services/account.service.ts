import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(
        (response: User) => {
          const user = response;
          if(user) this.setCurrentUser(user);
        }
      )
    );
  }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(
        (response: User) => {
          const user = response;
          if(user) this.setCurrentUser(user);
        }
      )
    )
  }

  getUsers(){
    return this.http.get<any>(this.baseUrl + 'account/get-users');
  }

  logout(){
    this.currentUserSource.next(null);
    localStorage.removeItem('user');
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

}
