import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CustomerinfoPage} from '../customerinfo/customerinfo';
import {AdminPage} from '../admin/admin';
import { FirstpagePage } from '../firstpage/firstpage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	customerinfoPage = CustomerinfoPage;
  adminPage = AdminPage;
  firstPage = FirstpagePage;
	constructor(public navCtrl: NavController) {
  }
}
