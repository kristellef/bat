import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CustomerinfoPage} from '../customerinfo/customerinfo';
import {RejectionFormPage} from '../rejection-form/rejection-form';
import {AdminPage} from '../admin/admin';
import { FirstpagePage } from '../firstpage/firstpage';
import { SingletonService } from '../../providers/singleton';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	customerinfoPage = CustomerinfoPage;
  adminPage = AdminPage;
  firstPage = FirstpagePage;
  rejectionFormPage = RejectionFormPage;
  outletUser: Object;

	constructor(public navCtrl: NavController, public singleton:SingletonService) {
        this.singleton.getProperty('outlet_user').then((val) => {
          this.outletUser = val;
        });
  }

  ionViewDidLoad() {
      this.singleton.getProperty('outlet_user').then((val) => {
        this.outletUser = val;
      });
  }


  logout() {
      this.singleton.setProperty('old_outlet_user',this.outletUser);
      this.singleton.setProperty('outlet_user',{});
      this.navCtrl.popToRoot();
  }

}
