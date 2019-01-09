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
  area: AbstractControl;
  country: String;

  promotions: Array<any>;
  promotionId: Number;
  promotionItem1: String;
  promotionItem2: String;

  areas: Array<any>;
  areaId: Number;
  region: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, private storage: Storage) {
    this.refreshCountry();
    this.refreshPromotions();
    this.refreshAreas();

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
      area: ['', Validators.required],
    });

    this.name = this.formgroup.controls['name'];
    this.surname = this.formgroup.controls['surname'];
    this.email = this.formgroup.controls['email'];
    this.birthdate = this.formgroup.controls['birthdate']
    this.number = this.formgroup.controls['number'];
    this.gender = this.formgroup.controls['gender'];
    this.brand = this.formgroup.controls['brand'];
    this.promotion = this.formgroup.controls['promotion'];
    this.area = this.formgroup.controls['area'];
  }

  ionViewWillEnter() {
    this.refreshCountry();
    this.refreshPromotions();
    this.refreshAreas();
  }

  ionViewDidLoad() {
    this.refreshCountry();
    this.refreshPromotions();
    this.refreshAreas();
  }

  refreshPromotions() {
    // Refresh Country value
    this.storage.get('promotions').then((val) => {

        if (this.country == 'Lebanon'){
            this.promotions = val.Lebanon;
        } else if(this.country == 'Syria') {
            this.promotions = val.Syria;
        }
      this.promotionId = null;
    });
  }

  refreshAreas() {
    // Refresh Areas value
    this.storage.get('areas').then((val) => {
        if (this.country == 'Lebanon'){
            this.areas = val.Lebanon;
        } else if(this.country == 'Syria') {
            this.areas = val.Syria;
        }
      this.areaId = null;
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
      area: this.area.value.id,
      region: this.region
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

  choseArea() {
    this.region = null;
  }

  get submittable() {
    if (this.promotionItem1 == null) {
        return false;
    }
    if (this.region == null) {
        return false;
    }

    return this.formgroup.valid;
  }

}
