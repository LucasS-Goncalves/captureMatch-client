import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, State } from 'src/app/_interfaces/state_city';



@Component({
  selector: 'app-register-photographer',
  templateUrl: './register-photographer.component.html',
  styleUrls: ['./register-photographer.component.scss']
})
export class RegisterPhotographerComponent implements OnInit{

  maxDate: Date = new Date();
  registerForm: FormGroup = new FormGroup({});
  showPassword = false;
  @Output() backToInitial = new EventEmitter();

  @ViewChild('state', {static: true}) stateSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('city', {static: true}) citySelect!: ElementRef<HTMLSelectElement>;
  config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/US/states',
    cKey: 'YnIxNDdZTzVLeHIzd2JVa3hBcjBIc3Bqckx2VnAydWFqem9VNkI5Uw=='
  }
  states: State[] = [
    { name: 'Alabama', isoCode: 'AL' },
    { name: 'Alaska', isoCode: 'AK' },
    { name: 'Arizona', isoCode: 'AZ' },
    { name: 'Arkansas', isoCode: 'AR' },
    { name: 'California', isoCode: 'CA' },
    { name: 'Colorado', isoCode: 'CO' },
    { name: 'Connecticut', isoCode: 'CT' },
    { name: 'Delaware', isoCode: 'DE' },
    { name: 'Florida', isoCode: 'FL' },
    { name: 'Georgia', isoCode: 'GA' },
    { name: 'Hawaii', isoCode: 'HI' },
    { name: 'Idaho', isoCode: 'ID' },
    { name: 'Illinois', isoCode: 'IL' },
    { name: 'Indiana', isoCode: 'IN' },
    { name: 'Iowa', isoCode: 'IA' },
    { name: 'Kansas', isoCode: 'KS' },
    { name: 'Kentucky', isoCode: 'KY' },
    { name: 'Louisiana', isoCode: 'LA' },
    { name: 'Maine', isoCode: 'ME' },
    { name: 'Maryland', isoCode: 'MD' },
    { name: 'Massachusetts', isoCode: 'MA' },
    { name: 'Michigan', isoCode: 'MI' },
    { name: 'Minnesota', isoCode: 'MN' },
    { name: 'Mississippi', isoCode: 'MS' },
    { name: 'Missouri', isoCode: 'MO' },
    { name: 'Montana', isoCode: 'MT' },
    { name: 'Nebraska', isoCode: 'NE' },
    { name: 'Nevada', isoCode: 'NV' },
    { name: 'New Hampshire', isoCode: 'NH' },
    { name: 'New Jersey', isoCode: 'NJ' },
    { name: 'New Mexico', isoCode: 'NM' },
    { name: 'New York', isoCode: 'NY' },
    { name: 'North Dakota', isoCode: 'ND' },
    { name: 'North Carolina', isoCode: 'NC' },
    { name: 'Ohio', isoCode: 'OH' },
    { name: 'Oklahoma', isoCode: 'OK' },
    { name: 'Oregon', isoCode: 'OR' },
    { name: 'Pennsylvania', isoCode: 'PA' },
    { name: 'Rhode Island', isoCode: 'RI' },
    { name: 'South Carolina', isoCode: 'SC' },
    { name: 'South Dakota', isoCode: 'SD' },
    { name: 'Tennessee', isoCode: 'TN' },
    { name: 'Texas', isoCode: 'TX' },
    { name: 'Utah', isoCode: 'UT' },
    { name: 'Vermont', isoCode: 'VT' },
    { name: 'Virginia', isoCode: 'VA' },
    { name: 'Washington', isoCode: 'WA' },
    { name: 'West Virginia', isoCode: 'WV' },
    { name: 'Wisconsin', isoCode: 'WI' },
    { name: 'Wyoming', isoCode: 'WY' }
  ];
  cities: City[] = [];

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  private initializeForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    })
  }

  backToInitialContainer(){
    this.backToInitial.emit();
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }

  // loadCities(event: any){
  //   const stateSelected = event.target.value;
  //   console.log(stateSelected)
  //   fetch(`${this.config.cUrl}/${stateSelected}/cities`, {headers: {"X-CSCAPI-KEY": this.config.cKey}})
  //     .then(res => res.json())
  //     .then(data => {
  //       this.cities = data;
  //     })
  // }
}
