import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit{

  registerForm:FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  showPassword = false;
  @Output() backToInitial = new EventEmitter();

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
}
