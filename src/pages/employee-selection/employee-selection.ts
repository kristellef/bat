import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { AdminPage } from '../admin/admin';
import { CustomerinfoPage } from '../customerinfo/customerinfo';
import { SingletonService } from '../../providers/singleton';
import { FirstpagePage } from '../firstpage/firstpage';


/**
 * Class for the Emplpyee Selection page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'employee-selection',
  templateUrl: 'employee-selection.html',
})
export class EmployeeSelection {
  customerinfoPage = CustomerinfoPage;
  adminPage = AdminPage;
  homePage = HomePage;
  firstPage = FirstpagePage;
  country: String;
  promotions: Array<any>;

  baUser: Object = {
    baName: '',
    region: '',
    outletName: ''
  };

  // FOrm
  formgroup: FormGroup;
  baName: AbstractControl;
  region: AbstractControl;
  outletName: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public singleton:SingletonService, public formbuilder: FormBuilder) {
    this.refreshCountry();
    this.refreshPromotions();

    // Retrieve old user and suggest as value
    this.singleton.getProperty('old_outlet_user').then((val) => {
        if (val == null) {
            val = {};
        }
        console.log('val',val)
        this.baUser = val;

    });

    // Then init form
    this.formgroup = formbuilder.group({
      baName: ['', Validators.required],
      region: ['', Validators.required],
      outletName: ['', Validators.required],
    });

    this.baName = this.formgroup.controls['baName'];
    this.region = this.formgroup.controls['region'];
    this.outletName = this.formgroup.controls['outletName'];

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

  // Create BA outlet user
  login() {
      console.log(this.baUser);
    this.singleton.setProperty('outlet_user',this.baUser);
    alert('Done! You can now fill forms.')

    this.navCtrl.push(this.homePage);
  }

  get formAccess() {
    // we want the country to be either Lebanon or Syria
    let access = true;

    if (this.country != 'lebanon' && this.country != 'syria') {
      access = false;
    }

    // We want formt to be loaded
    if (this.promotions == null || this.promotions == undefined){
      access = false;
    }

    return access;

  }

}
