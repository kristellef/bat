import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SingletonService } from '../../providers/singleton';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


/**
 * Generated class for the RejectionFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rejection-form',
  templateUrl: 'rejection-form.html',
})
export class RejectionFormPage {

    reasons:Object[] = [];
    cigaretteBrands:Object[] = [];

    formgroup: FormGroup;
    cigaretteBrand: AbstractControl;
    cigarette: AbstractControl;
    reason: AbstractControl;

    chosenCigaretteBrand: Object = {};
    chosenCigarette: String;
    chosenReason: String;

    country: String;
    outlet_user: Object;


  constructor(public navCtrl: NavController, public navParams: NavParams,
       public singleton:SingletonService, public formbuilder: FormBuilder
  ) {
      this.refreshData();

      this.formgroup = formbuilder.group({
        cigaretteBrand: ['',Validators.required],
        cigarette: ['', Validators.required],
        reason: ['', Validators.required],
      });

      this.cigaretteBrand = this.formgroup.controls['cigaretteBrand'];
      this.cigarette = this.formgroup.controls['cigarette'];
      this.reason = this.formgroup.controls['reason'];

  }

  ionViewDidLoad() {
    this.refreshData();
  }

  refreshData() {
      this.singleton.getProperty('outlet_user').then((val) => {
        this.outlet_user = val
      });
      this.singleton.getProperty('rejection_reasons').then((val) => {
          this.reasons = val;
          console.log(this.reasons );
      });
      this.singleton.getProperty('cigarette_brands').then((val) => {
          this.cigaretteBrands = val;
      });
      this.singleton.getProperty('country').then((val) => {
          this.country = val;
      });
  }

  submit() {
      let now = new Date();

      let data = {
          created_at: now.toISOString(),
          cigarette_brand: this.chosenCigaretteBrand['name'] ? this.chosenCigaretteBrand['name']: 'error',
          cigarette: this.chosenCigarette,
          reason: this.chosenReason,
          country: 'lebanon',
          outlet_user: this.outlet_user
      }

      // Get the current value and add new one
      this.singleton.getProperty('rejection_forms').then((val) => {
        if (val == null) val = [];

        val.push(data);
        this.singleton.setProperty('rejection_forms', val);
      });

      alert("Thank you! Your form was submitted.");
      this.navCtrl.pop();

  }

}
