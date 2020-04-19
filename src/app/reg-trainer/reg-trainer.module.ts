import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegTrainerPageRoutingModule } from './reg-trainer-routing.module';

import { RegTrainerPage } from './reg-trainer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegTrainerPageRoutingModule
  ],
  declarations: [RegTrainerPage]
})
export class RegTrainerPageModule {}
