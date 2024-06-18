import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../_interfaces/user';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(
        (response: User) => {
          const user = response;
          if(user) this.currentUserSource.next(user);
        }
      )
    );
  }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(
        (response: User) => {
          const user = response;
          if(user) this.currentUserSource.next(user);
        }
      )
    )
  }

  logout(){
    this.currentUserSource.next(null);
    localStorage.removeItem('user');
  }

  private setCurrentUser(user: User){
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

}
