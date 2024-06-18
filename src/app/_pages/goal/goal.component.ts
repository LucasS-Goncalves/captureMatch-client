import { Component } from '@angular/core';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent {
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
