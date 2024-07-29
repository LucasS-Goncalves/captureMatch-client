import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Photographer } from 'src/app/_models/photographer';
import { User } from 'src/app/_models/user';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-profile',
  templateUrl: './photographer-profile.component.html',
  styleUrls: ['./photographer-profile.component.scss']
})
export class PhotographerProfileComponent implements OnInit{

  user: Photographer | undefined;
  constructor(private route: ActivatedRoute, private memberService: MemberService, private router: Router){}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        if(data['photographer']) {
          this.user = data['photographer'];
        } else {
          this.router.navigateByUrl('search');
        }
      }
    })
  }
}
