import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { RegisterComponent } from './_pages/register/register.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'register', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
