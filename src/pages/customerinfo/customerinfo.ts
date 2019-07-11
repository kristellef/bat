import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SingletonService } from '../../providers/singleton';
import { HomePage } from '../home/home';

/**
 * Generated class for the CustomerinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-customerinfo',
  templateUrl: 'customerinfo.html',
})
export class CustomerinfoPage {

  homepage = HomePage;

  formgroup: FormGroup;
  name: AbstractControl;
  surname: AbstractControl;
  email: AbstractControl;
  birthdate: AbstractControl;
  gender: AbstractControl;
  number: AbstractControl;
  promotion: AbstractControl;
  country: String;
  cigaretteBrand: AbstractControl;
  cigarette: AbstractControl;
  reason: AbstractControl;

  promotions: Array<any>;
  promotionId: Number;
  promotionItem1: String;
  promotionItem2: String;

  cigaretteBrands:Object[] = [];

  chosenCigaretteBrand: Object = {};
  chosenCigarette: String;
  chosenReason: String;
  outlet_user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, public singleton:SingletonService) {
    this.refreshCountry();
    this.refreshPromotions();
    this.refreshCigarettes();
    this.refreshOutletUser();

    // Init form
    let regexPhone='';
    if (this.country=='lebanon') {
        regexPhone = '/\d{8}/';
    } else if (this.country=='syria') {
        regexPhone = '/\d{9}/';
    }

    this.formgroup = formbuilder.group({
      name: ['', Validators.compose([Validators.required,])],
      surname: ['', Validators.required],
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      birthdate: ['< 30'],
      gender: ['Male'],
      number: ['', Validators.compose(
          [
                Validators.pattern(regexPhone)
            ])],
      promotion: ['', Validators.required],
      cigaretteBrand: ['',Validators.required],
      cigarette: ['', Validators.required],
    });

    this.name = this.formgroup.controls['name'];
    this.surname = this.formgroup.controls['surname'];
    this.email = this.formgroup.controls['email'];
    this.birthdate = this.formgroup.controls['birthdate']
    this.number = this.formgroup.controls['number'];
    this.gender = this.formgroup.controls['gender'];
    this.promotion = this.formgroup.controls['promotion'];
    this.cigaretteBrand = this.formgroup.controls['cigaretteBrand'];
    this.cigarette = this.formgroup.controls['cigarette'];
  }

  ionViewWillEnter() {
    this.refreshCountry();
    this.refreshPromotions();
    this.refreshCigarettes();
    this.refreshOutletUser();
  }

  ionViewDidLoad() {
    this.refreshCountry();
    this.refreshPromotions();
    this.refreshCigarettes();
    this.refreshOutletUser();
  }

  refreshOutletUser() {
    this.singleton.getProperty('outlet_user').then((val) => {
      this.outlet_user = val
    });
  }

  refreshPromotions() {
    // Refresh Country value
    this.singleton.getProperty('promotions').then((val) => {
      this.promotions = val
      this.promotionId = null;
    });
  }

  refreshCigarettes() {
    // Refresh cigarettes value
    this.singleton.getProperty('cigarette_brands').then((val) => {
        this.cigaretteBrands = val;
    });
  }

  refreshCountry() {
    // Refresh Country value
    this.singleton.getProperty('country').then((val) => {
      this.country = val;
    });
  }

  getPhoneValue() {
      return '+961' + this.number.value;
  }

  getFormJson() {
    let now = new Date();

    return {
      created_at: now.toISOString(),
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      birthdate: this.birthdate.value,
      number: this.getPhoneValue(),
      gender: this.gender.value,
      promotion: this.promotion.value.id,
      promotionItem1: this.promotionItem1,
      promotionItem2: this.promotionItem2,
      country: 'lebanon',
      cigarette_brand: this.chosenCigaretteBrand['name'] ? this.chosenCigaretteBrand['name']: 'error',
      cigarette: this.chosenCigarette,
      outlet_user: this.outlet_user
    }
  }


  save() {
    // Get the current value and add new one
    this.singleton.getProperty('forms').then((val) => {
      if (val == null) val = [];

      val.push(this.getFormJson());
      this.singleton.setProperty('forms', val);
    });
  }

  submit() {
    this.save();
    alert("Thank you! Your form was submitted.");
    this.navCtrl.pop();
  }

  chosePromotion() {
    this.promotionItem1 = null;
    this.promotionItem2 = null;
  }

  get submittable() {
    if (this.promotionItem1 == null) {
        return false;
    }

    if (this.chosenCigarette == "" || this.chosenCigarette == null) {
        return false;
    }

    return this.formgroup.valid;
  }

}
