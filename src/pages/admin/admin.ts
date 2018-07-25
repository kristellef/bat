import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';


import { CustomerinfoPage } from '../customerinfo/customerinfo';
import { FirstpagePage } from '../firstpage/firstpage';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  customerinfoPage = CustomerinfoPage;
  adminPage = AdminPage;
  firstPage = FirstpagePage;
  country: String;

  forms: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: Http) {
    this.refreshCountry();
    this.refreshForms();
  }


  ionViewWillEnter() {
    this.refreshCountry();
    this.refreshForms();
  }

  ionViewDidLoad() {
    this.refreshCountry();
    this.refreshForms();
  }

  refreshCountry() {
    // Refresh Country value
    this.storage.get('country').then((val) => {
      this.country = val;
    });

    console.log('Country found on admin page:' + this.country);
  }

  refreshForms() {
    // Refresh Country value
    this.storage.get('forms').then((val) => {
      this.forms = val;
    });

    console.log(this.forms);
  }

  refreshPromotions() {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.get("http://bat.nahum/api/promotions", options)
      .subscribe(data => {
        let promotions = JSON.parse((<any>data)._body)
        console.log(promotions);
        this.storage.set('promotions',promotions.data);
        alert('Promotions updated.');
        return;
      }, error => {
        alert('Oups, something went wrong... Please try again later.');
        alert('DEBUG:'+error);
        return;
      });
  }


  setLeb() {
    this.storage.set('country', 'Lebanon');
    this.country = 'Lebanon';
    alert('Country set to Lebanon.');
  }
  setSyria() {
    this.storage.set('country', 'Syria');
    this.country = 'Syria';
    alert('Country set to Syria.');
  }

  get formsCount() {
    if (this.forms) {
      return this.forms.length;
    } else {
      return 0;
    }
  }

  resetForms() {
    this.storage.remove('forms');
    this.forms = [];
    return;
  }

  postRequest() {
    let body = { data: this.forms };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://bat.nahum/api/forms/add", body, options)
      .subscribe(data => {
        this.resetForms();
        alert('Form synced.');
        return;
      }, error => {
        console.log(error);// Error getting the data
        alert('Oups, something went wrong... Please try again later.');
        return;
      });
  }

}
