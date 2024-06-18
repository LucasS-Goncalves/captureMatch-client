import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './_pages/home-page/home-page.component';
import { GoalComponent } from './_pages/goal/goal.component';
import { RegisterFormComponent } from './_components/register-form/register-form.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'goal', component: GoalComponent
  },
  {
    path: 'register-form', component: RegisterFormComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
