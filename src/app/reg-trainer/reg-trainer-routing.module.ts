import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegTrainerPage } from './reg-trainer.page';

const routes: Routes = [
  {
    path: '',
    component: RegTrainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegTrainerPageRoutingModule {}
