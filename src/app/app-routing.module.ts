import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './_pages/home-page/home-page.component';
import { GoalComponent } from './_pages/goal/goal.component';
import { RegisterFormComponent } from './_components/register-form/register-form.component';
import { SearchPageComponent } from './_pages/search-page/search-page.component';
import { PhotographerProfileComponent } from './_pages/photographer-profile/photographer-profile.component';
import { PhotographerResolver } from './_resolvers/photographer.resolver';

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
  {
    path: 'search', component: SearchPageComponent
  },
  {
    path: 'profile/:userName', component: PhotographerProfileComponent, resolve: {photographer: PhotographerResolver}
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
