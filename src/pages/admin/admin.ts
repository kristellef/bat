import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';

import {CustomerinfoPage} from '../customerinfo/customerinfo';
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
  firstPage=FirstpagePage;

  forms: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: HTTP) {
    this.storage.get('forms').then((val) => {
       this.forms = val;
    });
  }

  ionViewDidLoad() {
    console.log('Loaded');
  }

  get formsCount() {
    if (this.forms) {
      return this.forms.length;
    } else {
      return 0;
    }
  }

  resetForms(){
    this.storage.set('forms', []);
  }

  postRequest() {

      this.http.post("http://bat.kristelle.io/api/forms/add", {data:this.forms}, {

           }
       )
        .then(data => {
            console.log(data);
            alert('Form synced.')
        }).catch(error => {
            console.log(error);
            alert('Oups, something went wrong... Please try again later.');
            return;
        });
    }

}
