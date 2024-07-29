import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { GoalComponent } from './_pages/goal/goal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { RegisterFormComponent } from './_components/register-form/register-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchPageComponent } from './_pages/search-page/search-page.component';
import { NavbarLoggedComponent } from './_components/navbar-logged/navbar-logged.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { PhotographerCardComponent } from './_components/photographer-card/photographer-card.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SearchInputsComponent } from './_components/search-inputs/search-inputs.component';
import { PhotographerProfileComponent } from './_pages/photographer-profile/photographer-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    GoalComponent,
    RegisterFormComponent,
    SearchPageComponent,
    NavbarLoggedComponent,
    PhotographerCardComponent,
    SearchInputsComponent,
    PhotographerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
