import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CustomerinfoPage} from '../customerinfo/customerinfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	customerinfoPage = CustomerinfoPage;
	constructor(public navCtrl: NavController) {
  }

}
