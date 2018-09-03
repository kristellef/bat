import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AdminPage } from '../admin/admin';
import { CustomerinfoPage } from '../customerinfo/customerinfo';
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
  country: String;
  promotions: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.refreshCountry();
    this.refreshPromotions();
  }

  ionViewWillEnter() {
    this.refreshCountry();
    this.refreshPromotions();
  }

  ionViewDidLoad() {
    this.refreshCountry();
    this.refreshPromotions();
  }

  refreshCountry() {
    // Refresh Country value
    this.storage.get('country').then((val) => {
      this.country = val;
    });

    console.log('Country found on firstpage page:' + this.country);
  }

  refreshPromotions() {
      // Refresh Country value
      this.storage.get('promotions').then((val) => {
        this.promotions = val;
      });

      console.log('Promotions refreshed.',this.promotions);
  }

  get formAccess() {
    // we want the country to be either Lebanon or Syria
    let access = true;

    if (this.country != 'Lebanon' && this.country != 'Syria') {
      access = false;
    }

    // We want formt to be loaded
    if (this.promotions == null || this.promotions == undefined){
      access = false;
    }
    return access;

  }

}
