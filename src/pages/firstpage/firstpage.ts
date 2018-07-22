import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {AdminPage} from '../admin/admin';
import {CustomerinfoPage} from '../customerinfo/customerinfo';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FirstpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstpage',
  templateUrl: 'firstpage.html',
})
export class FirstpagePage {
  customerinfoPage = CustomerinfoPage;
  adminPage = AdminPage;
  homePage = HomePage;
  country = String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('country').then((val) => {
       this.country = val;
    });
  }

  ionViewDidLoad() {
    console.log("firstPage");
  }

  selectCountry(){
    console.log(this.country);
    if (this.country == 'Lebanon' || this.country == 'Syria'){
      return true;
    }
    else{
      return false;
    }
  }


}
