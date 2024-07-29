import { Component, Input } from '@angular/core';
import { PhotographerCard } from 'src/app/_models/photographerCard';

@Component({
  selector: 'app-photographer-card',
  templateUrl: './photographer-card.component.html',
  styleUrls: ['./photographer-card.component.scss']
})
export class PhotographerCardComponent {
  @Input({required: true}) photographer: PhotographerCard = {
    firstName: '',
    lastName: '',
    userName: '',
    state: '',
    city: '',
    profilePhotoUrl: ''
  };
}
