import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAlquilerPage } from './add-alquiler';

@NgModule({
  declarations: [
    AddAlquilerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAlquilerPage),
  ],
})
export class AddAlquilerPageModule {}
