import { Photographer } from './../_models/photographer';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment.development';
import { PhotographerCard } from "../_models/photographerCard";
import { UserParams } from "../_models/userParams";
import { User } from "../_models/user";

@Injectable({
  providedIn: 'root'
})

export class MemberService{

  userParams = new UserParams();
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient){}

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams = params;
  }

  getMember(username: string){
    return this.http.get<Photographer>(this.baseUrl + 'users/' + username);
  }

  getPhotographers(){
    let params = new HttpParams();
    params = params.append('state', this.userParams.state);
    params = params.append('city', this.userParams.city);
    params = params.append('photographersSearchKey', this.userParams.photographersSearchKey);

    return this.http.get<PhotographerCard[]>(this.baseUrl + 'users/' + 'photographers', {params});
  }
}
