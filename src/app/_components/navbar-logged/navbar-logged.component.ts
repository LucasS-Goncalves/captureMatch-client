import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrls: ['./navbar-logged.component.scss']
})
export class NavbarLoggedComponent {

  menuOpened = false;
  isCollapsed = true;

  constructor(private accoutService: AccountService, private router: Router){}

  openMenu(){
    this.menuOpened = !this.menuOpened;
  }

  logout(){
    this.accoutService.logout();
    this.router.navigateByUrl('');
  }
}
