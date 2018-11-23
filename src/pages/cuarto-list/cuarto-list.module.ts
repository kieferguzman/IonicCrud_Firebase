import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuartoListPage } from './cuarto-list';

@NgModule({
  declarations: [
    CuartoListPage,
  ],
  imports: [
    IonicPageModule.forChild(CuartoListPage),
  ],
})
export class CuartoListPageModule {}
