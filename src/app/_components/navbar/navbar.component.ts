import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './styles/modal.scss']
})
export class NavbarComponent implements OnInit{

  user$!: Observable<User | null>;
  windowInnerWidth: any;
  menuOpened = false;
  modalRef?: BsModalRef;
  showPassword = false;
  isCollapsed = true;
  loginForm: FormGroup = new FormGroup({});
  @ViewChild('template', {static: true}) template!: TemplateRef<void>;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private accoutService: AccountService, private accountService: AccountService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.fragment.subscribe({
      next: fragment => {
        if(fragment === 'login'){
          this.openModal();
        }
      }
    })

    this.user$ = this.accountService.currentUser$;
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.windowInnerWidth = window.innerWidth;

    if(this.windowInnerWidth > 800 && this.menuOpened === true){
      this.menuOpened = false;
    }
  }

  openMenu(){
    this.menuOpened = !this.menuOpened;
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }

  submitLoginForm(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        this.modalRef?.hide();
        this.router.navigateByUrl('search')
      }
    });
  }

  logout(){
    this.accoutService.logout();
    this.router.navigateByUrl('');
    this.isCollapsed = true;
  }

  private initializeForm(){
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
    })
  }
}
