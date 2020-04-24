import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksPage } from './tasks.page';
import { NonsurveyGuard } from '../guards/nonsurvey.guard';

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  },
  {
    path: 'add',
    loadChildren: () => import('./addtask/addtask.module').then( m => m.AddtaskPageModule),
    canActivate:[NonsurveyGuard]
  },
  {
    path: 'all',
    loadChildren: () => import('./tasklist/tasklist.module').then( m => m.TasklistPageModule),
    canActivate:[NonsurveyGuard]
  },
  {
    path: 'single/:id',
    loadChildren: () => import('./single/single.module').then( m => m.SinglePageModule),
    canActivate:[NonsurveyGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksPageRoutingModule {}
