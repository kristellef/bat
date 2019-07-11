import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeeSelection } from '../employee-selection/employee-selection';
import { AdminPage } from '../admin/admin';
import { CustomerinfoPage } from '../customerinfo/customerinfo';
import { SingletonService } from '../../providers/singleton';

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
  employeeSelection = EmployeeSelection;
  country: String;
  promotions: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public singleton:SingletonService) {
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
    this.singleton.getProperty('country').then((val) => {
      this.country = val;
    });
  }

  refreshPromotions() {
      // Refresh Country value
      this.singleton.getProperty('promotions').then((val) => {
        this.promotions = val;
      });
  }

  alertForm() {
      if (!this.formAccess) {
          alert('An admin must download app data before you can access the form.')
      }
  }

  get formAccess() {
    // we want the country to be either Lebanon or Syria
    let access = true;

    // We want formt to be loaded
    if (this.promotions == null || this.promotions == undefined){
      access = false;
    }

    return access;

  }

}
