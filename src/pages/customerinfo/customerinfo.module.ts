import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerinfoPage } from './customerinfo';

@NgModule({
  declarations: [
    CustomerinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerinfoPage),
  ],
})
export class CustomerinfoPageModule {}
