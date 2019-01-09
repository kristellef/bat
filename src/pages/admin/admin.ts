import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  loginForm: FormGroup;

  token: string;
  user: Object;

  baseUrl: string;
  authURL: string;

  forms: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, private storage: Storage, private http: Http) {
    this.loginForm = formbuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      password: ['', Validators.required]
    });

    this.user = {};
    this.token = "";

    this.baseUrl = "https://bat.kristelle.io/api/";
    this.authURL = "https://bat.kristelle.io/oauth/token";

    this.refreshData();
    this.refreshUser();
  }

  getHeaders() {
      var headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');

      if (this.token != "") {
          headers.append('Authorization', 'Bearer ' + this.token);
      }

      return headers;
  }

  login(){
    let data = {
	"client_id": 3,
	"client_secret": "fQidOFZMRLIC6AOVmBKpD8XkTtRMNL4es242xb57",
	"grant_type": "password",
	"username": this.loginForm.controls['email'].value,
	"password": this.loginForm.controls['password'].value,
	"scope": "*"
    };

    // Auth get oauth token
    let options = new RequestOptions({ headers: this.getHeaders() });

    this.http.post(this.authURL, data, options)
      .subscribe(data => {

          let body = JSON.parse((<any>data)._body);
          this.saveToken( body.access_token );

          // Now query user
          this.refreshUser();

      }, error => {
          console.log(error);// Error getting the data
        if (JSON.parse((<any>error)._body).error == 'invalid_credentials') {
            alert('Wrong credentials.');
        } else {
            alert('Oups, something went wrong... Please try again later.');
        }
        return;
      });
  }

  refreshUser() {
      if (this.token==""){
          return;
      }

      let options = new RequestOptions({ headers: this.getHeaders() });
      this.http.get(this.baseUrl + "user", options)
        .subscribe(data => {
          let user = JSON.parse((<any>data)._body)

          if (this.user == {}) {
              if (user.lebanon) {
                this.setLeb();
            } else {
                this.setSyria();
            }

            this.saveUser(user);
            alert('Connected. Welcome '+this.user['first_name']+" !");
        } else {
            if (!user.lebanon && this.country == 'Lebanon') {
                this.saveUser(user);
                this.setSyria();
            } else if(!user.syria && this.country == 'Syria') {
                this.saveUser(user);
                this.setLeb();
            } else {
                this.saveUser(user);
            }
        }

          return;
        }, error => {
            if (error.status == 401) {
                this.clearSession();
                return;
            }

          alert('Failed to update user.');
          return;
        });
  }

  saveToken(value){
      this.storage.set('token', value);
      this.token = value;
  }

  saveUser(value){
      this.storage.set('user', value);
      this.user = value;
  }

  clearSession() {
      this.saveToken("");
      this.saveUser({});
      this.storage.set('areas',[]);
      this.storage.set('promotions',[]);
      this.storage.set('country',"");

      alert('Session expired.');
  }

  ionViewWillEnter() {
    this.refreshData();
    this.refreshUser();
  }

  ionViewDidLoad() {
    this.refreshData();
    this.refreshUser();
  }

  refreshData() {
      // Refresh Country value
      this.storage.get('country').then((val) => {
        this.country = val;
      });
      this.storage.get('forms').then((val) => {
        this.forms = val;
      });
      this.storage.get('user').then((val) => {
        this.user = val;
      });
      this.storage.get('token').then((val) => {
        this.token = val;
      });
  }

  refreshAreasAndPromotions() {
      this.refreshPromotions();
      this.refreshAreas();
  }

  refreshPromotions() {
    let options = new RequestOptions({ headers: this.getHeaders() });

    this.http.get(this.baseUrl + "promotions", options)
      .subscribe(data => {
        let promotions = JSON.parse((<any>data)._body)
        console.log(promotions);
        this.storage.set('promotions',promotions);
        alert('Promotions updated.');
        return;
      }, error => {
          if (error.status == 401) {
              this.clearSession();
              return;
          }
          console.log(error);
          alert('Oups, something went wrong... Please try again later.');
          return;
      });
  }

  refreshAreas() {
    let options = new RequestOptions({ headers: this.getHeaders() });

    this.http.get(this.baseUrl + "areas", options)
      .subscribe(data => {
        let areas = JSON.parse((<any>data)._body)
        this.storage.set('areas',areas);
        alert('Areas updated.');
        return;
      }, error => {
          if (error.status == 401) {
              this.clearSession();
              return;
          }
          console.log(error);
          alert('Oups, something went wrong... Please try again later.');
          return;
      });
  }

  setLeb() {
      if (!this.user['lebanon']) {
          alert('You are not allowed to choose Lebanon.');
          return;
      }

    this.storage.set('country', 'Lebanon');
    this.country = 'Lebanon';
    alert('Country set to Lebanon.');
  }

  setSyria() {
    if (!this.user['syria']) {
          alert('You are not allowed to choose Syria.');
          return;
    }

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

  get connected() {
    return this.user != {} && this.token != "";
  }

  resetForms() {
    this.storage.remove('forms');
    this.forms = [];
    return;
  }

  postRequest() {
    let body = { data: this.forms };

    let options = new RequestOptions({ headers: this.getHeaders() });

    this.http.post(this.baseUrl + "forms/add", body, options)
      .subscribe(data => {
        this.resetForms();
        alert('Form synced.');
        return;
      }, error => {
          if (error.status == 401) {
              this.clearSession();
              return;
          }

        console.log(error);// Error getting the data
        alert('Oups, something went wrong... Please try again later.');
        return;
      });
  }

}
