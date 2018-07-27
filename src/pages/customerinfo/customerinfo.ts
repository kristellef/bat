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
  promotionsValue: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, private storage: Storage) {
    this.formgroup = formbuilder.group({
      name: ['', Validators.compose([Validators.required,])],
      surname: ['', Validators.required],
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      birthdate: [''],
      gender: [''],
      number: ['', Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]+$')])],
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

    this.refreshPromotions();
    this.refreshCountry();
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
      this.promotionsValue = {};
    });
  }

  refreshCountry() {
    // Refresh Country value
    this.storage.get('country').then((val) => {
      this.country = val;
    });
  }

  getFormJson() {
    return {
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      birthdate: this.birthdate.value,
      number: this.number.value,
      gender: this.gender.value,
      brand: this.brand.value,
      promotionCount: this.selectedPromotionsCount,
      promotions: this.promotionsValue,
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

  chosePromotion(value) {
    this.promotionsValue = {};
    for (let i = 0; i < this.selectedPromotionsCount; i++) {
      this.promotionsValue[this.promotionsSelected[i].id.toString()] = null;
    }
    console.log(this.promotionsSelected);
  }

  getNumber(num) {
    var list = [];
    for (var i = 1; i <= num; i++) {
      list.push(i);
    }
    return list;
  }

  getOptions(num) {
    if (this.promotions.length < num) {
      return [];
    } else {
      return this.promotions[num].options;
    }
  }

  get promotionsCount() {
    if (this.promotions) {
      return this.promotions.length;
    } else {
      return 0;
    }
  }

  get selectedPromotionsCount() {
    if (this.promotion.value) {
      return this.promotion.value.length;
    } else {
      return 0;
    }
  }

  get promotionsSelected() {
    return this.promotion.value;
  }

  submittable() {
    for (var property in this.promotionsValue) {
      if (this.promotionsValue.hasOwnProperty(property)) {
        if (this.promotionsValue[property] == null) {
            return false;
        }
      }
    }
    return this.formgroup.valid;
  }

}
