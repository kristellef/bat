import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
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
  brand: AbstractControl;
  promotion: AbstractControl;
  country: String;

  promotions: Array<any>;
  promotionId: Number;
  promotionItem1: String;
  promotionItem2: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, private storage: Storage) {
    this.refreshPromotions();
    this.refreshCountry();

    let regexPhone='';
    if (this.country=='Lebanon') {
        regexPhone = '/\d{8}/';
    } else if (this.country=='Syria') {
        regexPhone = '/\d{9}/';
    }

    this.formgroup = formbuilder.group({
      name: ['', Validators.compose([Validators.required,])],
      surname: ['', Validators.required],
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      birthdate: [''],
      gender: [''],
      number: ['', Validators.compose(
          [
                Validators.required,
                Validators.pattern(regexPhone)
            ])],
      brand: ['', Validators.required],
      promotion: ['', Validators.required],
    });

    this.name = this.formgroup.controls['name'];
    this.surname = this.formgroup.controls['surname'];
    this.email = this.formgroup.controls['email'];
    this.birthdate = this.formgroup.controls['birthdate']
    this.number = this.formgroup.controls['number'];
    this.gender = this.formgroup.controls['gender'];
    this.brand = this.formgroup.controls['brand'];
    this.promotion = this.formgroup.controls['promotion'];
  }

  ionViewWillEnter() {
    this.refreshCountry();
    this.refreshPromotions();
  }

  ionViewDidLoad() {
    this.refreshCountry();
    this.refreshPromotions();
  }

  refreshPromotions() {
    // Refresh Country value
    this.storage.get('promotions').then((val) => {
      this.promotions = val;
      this.promotionId = null;
    });
  }

  refreshCountry() {
    // Refresh Country value
    this.storage.get('country').then((val) => {
      this.country = val;
    });
  }

  getPhoneValue() {
      if (this.country=='Lebanon') {
          return '+961' + this.number.value;
      } else if (this.country=='Syria') {
          return '+963' + this.number.value;
      }
  }

  getFormJson() {
    return {
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      birthdate: this.birthdate.value,
      number: this.getPhoneValue(),
      gender: this.gender.value,
      brand: this.brand.value,
      promotion: this.promotion.value.id,
      promotionItem1: this.promotionItem1,
      promotionItem2: this.promotionItem2,
      country: this.country,
    }
  }

  save() {
    // Get the current value and add new one
    this.storage.get('forms').then((val) => {
      if (val == null) val = [];

      val.push(this.getFormJson());
      this.storage.set('forms', val);
    });
  }

  submit() {
    this.save();
    alert("Thank you! your form was submitted.");
  }

  chosePromotion() {
    this.promotionItem1 = null;
    this.promotionItem2 = null;
  }

  get submittable() {
    if (this.promotionItem1 == null) {
        return false;
    }

    return this.formgroup.valid;
  }

}
