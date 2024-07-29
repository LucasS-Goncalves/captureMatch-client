import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { State, City } from 'src/app/_models/state_city';
import { UserParams } from 'src/app/_models/userParams';

@Component({
  selector: 'app-search-inputs',
  templateUrl: './search-inputs.component.html',
  styleUrls: ['./search-inputs.component.scss']
})
export class SearchInputsComponent {

  searchForm!: FormGroup;
  @Output() photographerSeachKey = new EventEmitter();
  @Output() appliedFilters = new EventEmitter();
  @Output() clearedFilters = new EventEmitter();
  isCollapsed = true;
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

  stateSelected = '';
  citySelected = '';
  filtersApplied = false;
  config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/US/states',
    cKey: 'YnIxNDdZTzVLeHIzd2JVa3hBcjBIc3Bqckx2VnAydWFqem9VNkI5Uw=='
  }

  constructor(private http: HttpClient, private fb: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.typeaheadSearch();
  }

  loadCities(stateName: string){
    const stateSelected = stateName;
    const state = this.statesWithIso.find(state => state.name.toLowerCase() === stateSelected.toLowerCase());

    if(state){
      this.http.get<City[]>(`${this.config.cUrl}/${state.isoCode}/cities`, {
        headers: {"X-CSCAPI-KEY": this.config.cKey}
      }).pipe(map(
        response => response.map(item => item.name)
      )).subscribe({
        next: response => {
          this.cities = response;
        }
      })
    }
  }

  typeaheadSearch(){
    this.searchForm.get('photographersSearchName')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => {
        this.photographerSeachKey.emit(value)
      }
    });
  }

  applyFilters(){
    this.filtersApplied = true;
    const userParams = new UserParams();
    userParams.state = this.searchForm.controls['state'].value;
    userParams.city = this.searchForm.controls['city'].value;
    userParams.photographersSearchKey = this.searchForm.controls['photographersSearchName'].value;
    this.appliedFilters.emit(userParams);
    this.stateSelected = this.searchForm.value.state;
    this.citySelected = this.searchForm.value.city;
  }

  clearFilters(){
    this.stateSelected = '';
    this.citySelected = '';
    this.filtersApplied = false;
    const photographersSearchName = this.searchForm.controls['photographersSearchName'].value;
    this.searchForm.reset({
      photographersSearchName: photographersSearchName,
      city: ''
    })
    this.clearedFilters.emit(true);
  }

  private initializeForm(){
    this.searchForm = this.fb.group({
      state: [''],
      city: ['', [this.authorizeCityField('state')]],
      photographersSearchName: ['']
    });
    this.searchForm.controls['state'].valueChanges.subscribe({
      next: () => this.searchForm.controls['city'].updateValueAndValidity()
    })
  }

  private authorizeCityField(stateField: string): ValidatorFn{
    return (control: AbstractControl) => {
      const stateFieldReference = control.parent?.get(stateField);
      if(!stateFieldReference?.value){
        return {stateFieldIsEmpty: true};
      }
      return (stateFieldReference?.value || stateFieldReference.value.length > 0 ) ? null : {stateFieldIsEmpty: true}
    }
  }
}
