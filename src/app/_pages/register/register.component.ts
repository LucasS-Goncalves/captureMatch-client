import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerAsPhotographer = false;
  registerAsClient = false;
  displayInitialContainer = true;

  registerPhotographer(){
    this.displayInitialContainer = false;
    this.registerAsPhotographer = true;
  }

  registerClient(){
    this.displayInitialContainer = false;
    this.registerAsClient = true;
  }

  backToInitialContainer(){
    this.displayInitialContainer = true;
    this.registerAsPhotographer = false;
    this.registerAsClient = false;
  }
}
