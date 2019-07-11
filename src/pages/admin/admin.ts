import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';


import { CustomerinfoPage } from '../customerinfo/customerinfo';
import { FirstpagePage } from '../firstpage/firstpage';
import { SingletonService } from '../../providers/singleton';

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

  token: string = "";
  clientSecret: string = "";
  clientId: number = 0;
  user: Object = {};

  baseUrl: string;
  authURL: string;

  forms: Array<any>;
  rejection_forms: Array<any> = [];

  constructor(public navCtrl: NavController,
         public navParams: NavParams,
         public formbuilder: FormBuilder,
         private http: Http,
         public singleton:SingletonService
     ) {

    this.loginForm = formbuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      password: ['', Validators.required]
    });

    let userPromise = this.singleton.getProperty('user',{}).then(val => {
        this.user = val;
    });
    let tokenPromise = this.singleton.getProperty('token','').then(val => {
        this.token = val;
    });

    if (this.singleton.env == 'prod' || this.singleton.env == 'production') {
        this.baseUrl = "https://lebanon.batform.me/api/";
        this.authURL = "https://lebanon.batform.me/oauth/token";
        this.clientSecret = "GElapPPKzeQiHueU5khcrtOjQX8SCjLatx4lRGGM"
        this.clientId = 4;
    } else {
        this.baseUrl = "https://bat-lebanon.nahum/api/";
        this.authURL = "https://bat-lebanon.nahum/oauth/token";
        this.clientSecret = "WsYQE0tXZBfNRSIRlYSoz9TacdJBxIVf8zAHBqfu";
        this.clientId = 2;
    }

    // Once all data is loaded
    Promise.all([userPromise, tokenPromise]).then(() => {
        this.refreshData();
        this.refreshUser();
    });
  }

  getHeaders() {
      var headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      if (this.token != "") {
          headers.append('Authorization', 'Bearer ' + this.token);
      }

      return headers;
  }

  login(){
    let data = {
	"client_id": this.clientId,
	"client_secret": this.clientSecret,
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

            this.saveUser(user);
            alert('Connected. Welcome '+this.user['first_name']+" !");
        } else {
            this.saveUser(user);
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
      this.singleton.setProperty('token', value);
      this.token = value;
  }

  saveUser(value){
      this.singleton.setProperty('user', value);
      this.user = value;
  }

  logout() {
      this.saveToken("");
      this.saveUser({});
     
      alert('Goodbye !');
  }

  clearSession() {
      this.saveToken("");
      this.saveUser({});
      this.singleton.setProperty('areas',[]);
      this.singleton.setProperty('promotions',[]);
      this.singleton.setProperty('country',"");

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
      this.singleton.getProperty('country').then((val) => {
        this.country = val;
      });
      this.singleton.getProperty('forms').then((val) => {
        this.forms = val;
      });
      this.singleton.getProperty('rejection_forms').then((val) => {
        this.rejection_forms = val;
      });
      this.singleton.getProperty('user').then((val) => {
        this.user = val;
      });
      this.singleton.getProperty('token').then((val) => {
        this.token = val;
      });
  }

  refreshAppData() {
      this.refreshPromotions();
      this.refreshCigaretteBrands();
      this.refreshRejectionReasons();
  }

  refreshPromotions() {
    let options = new RequestOptions({ headers: this.getHeaders() });

    this.http.get(this.baseUrl + "promotions", options)
      .subscribe(data => {
        let promotions = JSON.parse((<any>data)._body)
        this.singleton.setProperty('promotions',promotions.data);
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

  refreshCigaretteBrands() {
    let options = new RequestOptions({ headers: this.getHeaders() });

    this.http.get(this.baseUrl + "cigarette_brands", options)
      .subscribe(data => {
        let cigarette_brands = JSON.parse((<any>data)._body)
        this.singleton.setProperty('cigarette_brands',cigarette_brands.data);
        alert('Cigarette brands updated.');
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

  refreshRejectionReasons() {
    let options = new RequestOptions({ headers: this.getHeaders() });

    this.http.get(this.baseUrl + "rejection_reasons", options)
      .subscribe(data => {
        let rejection_reasons = JSON.parse((<any>data)._body)
        this.singleton.setProperty('rejection_reasons',rejection_reasons.data);
        alert('Rejection reasons updated.');
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

  get formsCount() {
    if (this.forms) {
      return this.forms.length;
    } else {
      return 0;
    }
  }

  get rejectedFormsCount() {
    if (this.rejection_forms) {
      return this.rejection_forms.length;
    } else {
      return 0;
    }
  }

  get connected() {
    return this.user != {} && this.token != "";
  }

  resetForms() {
    this.singleton.setProperty('forms',null);
    this.forms = [];
    return;
  }

  resetRejectionForms() {
    this.singleton.setProperty('rejection_forms',null);
    this.rejection_forms = [];
    return;
  }

  postRequest() {
      // Submit forms
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

     //submit rejection forms
     body = { data: this.rejection_forms };

     options = new RequestOptions({ headers: this.getHeaders() });

     this.http.post(this.baseUrl + "rejection-forms/add", body, options)
       .subscribe(data => {
         this.resetRejectionForms();
         alert('Rejection forms synced.');
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
