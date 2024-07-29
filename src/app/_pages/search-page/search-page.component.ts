import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { PhotographerCard } from 'src/app/_models/photographerCard';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{
  photographers$: Observable<PhotographerCard[]> = of<PhotographerCard[]>([]);
  photographersCount$ = of(0);
  user!: User;
  userParams: UserParams;

  constructor(private accountService: AccountService, private memberService: MemberService, private router: Router){
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: (user) => {
        if(user){
          this.user = user;
        } else{
          this.router.navigateByUrl('/');
        }
      }
    })

    this.loadPhotographers();
  }

  onClearFilters(){
    this.userParams.state = '';
    this.userParams.city = '';
    this.updateUserParams(this.userParams);
    this.loadPhotographers();
  }

  onApplyFilters(params: UserParams){
    this.userParams = params;
    this.updateUserParams(this.userParams);
    this.loadPhotographers();
  }

  onPhotographerKeySearch(photographerKey: string){
    this.userParams.photographersSearchKey = photographerKey;
    this.updateUserParams(this.userParams);
    this.loadPhotographers();
  }

  private loadPhotographers(){
    this.photographers$ = this.memberService.getPhotographers().pipe(
      map(res => {
        this.photographersCount$ = of(res.length);
        return res;
      })
    );
  }

  private updateUserParams(params: UserParams){
    this.memberService.setUserParams(params);
  }
}
