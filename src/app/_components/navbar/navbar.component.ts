import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './styles/modal.scss']
})
export class NavbarComponent {

  menuOpened = false;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openMenu(){
    this.menuOpened = !this.menuOpened;
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
