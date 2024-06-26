import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { State, City } from 'src/app/_interfaces/state_city';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss', './styles/state-input.scss']
})
export class RegisterClientComponent implements OnInit{

  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  showPassword = false;
  statesOpened = false;
  stateSelected = '';

  @Output() backToInitial = new EventEmitter();
  @ViewChild('state', {static: true}) stateSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('city', {static: true}) citySelect!: ElementRef<HTMLSelectElement>;
  config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/US/states',
    cKey: 'YnIxNDdZTzVLeHIzd2JVa3hBcjBIc3Bqckx2VnAydWFqem9VNkI5Uw=='
  }

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  statesWithIso: State[] = [
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
  cities: string[] = [];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private http: HttpClient){}

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.initializeForm();
    // this.loadCities();
  }

  backToInitialContainer(){
    this.backToInitial.emit();
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }

  register(){
    const dateOfBirth = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    // const formValues = ;
    // this.accountService.register(formValues).subscribe({
    //   next: () => this.router.navigateByUrl('/home'),
    //   error: error => console.log(error)
    // });
    console.log(dateOfBirth)
    console.log({...this.registerForm.value, dateOfBirth});
  }

  loadCities(stateName: string){
    const stateSelected = stateName;
    console.log(stateSelected)
    const state = this.statesWithIso.find(state => state.name.toLowerCase() === stateSelected.toLowerCase());

    if(state){
      this.http.get<City[]>(`${this.config.cUrl}/${state.isoCode}/cities`, {
        headers: {"X-CSCAPI-KEY": this.config.cKey}
      }).pipe(map(
        response => response.map(item => item.name)
      )).subscribe({
        next: response => {
          console.log(response);
          this.cities = response;
        }
      })
    }
  }

  private initializeForm(){
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['client', Validators.required]
    })
  }

  private getDateOnly(dateOfBirth: string | undefined){
    if(!dateOfBirth) return;
    let dob = new Date(dateOfBirth);
    return new Date(dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset())).toISOString().slice(0, 10);
  }
}
