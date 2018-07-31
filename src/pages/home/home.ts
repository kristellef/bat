import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CustomerinfoPage} from '../customerinfo/customerinfo';
import {AdminPage} from '../admin/admin';
import { FirstpagePage } from '../firstpage/firstpage';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	customerinfoPage = CustomerinfoPage;
  adminPage = AdminPage;
  firstPage = FirstpagePage;
  country = String;
	constructor(public navCtrl: NavController, private storage: Storage,) {
  }
  ionViewDidLoad() {
    this.storage.get('country').then((val) => {
      this.country = val;
    });
  }
}
