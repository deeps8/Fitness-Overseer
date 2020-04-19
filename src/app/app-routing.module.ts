import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { SurveyGuard } from './guards/survey.guard';
import { NonsurveyGuard } from './guards/nonsurvey.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[UnauthGuard,SurveyGuard]  
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'register-trainer',
    loadChildren: () => import('./reg-trainer/reg-trainer.module').then( m => m.RegTrainerPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule),
    canActivate:[UnauthGuard,NonsurveyGuard]
  },
  {
    path: 'diet',
    loadChildren: () => import('./diet/diet.module').then( m => m.DietPageModule),
    canActivate:[UnauthGuard,NonsurveyGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
