import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Storage } from '@ionic/storage';
import {HomePage} from '../home/home';

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

  formgroup:FormGroup;
  name:AbstractControl;
  surname:AbstractControl;
  email:AbstractControl;
  birthdate:AbstractControl;
  gender:AbstractControl;
  number:AbstractControl;
  brand:AbstractControl;
  promotion:AbstractControl;
  country: String;

  promotions: Array<any>;
  promotionsValue: Array<any>;




  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, private storage: Storage) {
  	this.formgroup = formbuilder.group({
  		name:['',Validators.compose([
		Validators.required,])],
  		surname:['',Validators.required],
  		email:['',Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
  		birthdate:[''],
  		gender:[''],
  		number:['', Validators.compose([Validators.minLength(8),Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]+$')])],
  		brand:['',Validators.required],
  		promotion:['',Validators.required],
      promotionX:['',Validators.required],
      // promotions:['',Validators.required],


  	});

  	this.name = this.formgroup.controls['name'];
  	this.surname = this.formgroup.controls['surname'];
  	this.email = this.formgroup.controls['email'];
  	this.birthdate = this.formgroup.controls['birthdate']
  	this.number = this.formgroup.controls['number'];
  	this.gender = this.formgroup.controls['gender'];
  	this.brand = this.formgroup.controls['brand'];
  	this.promotion = this.formgroup.controls['promotion'];
    this.storage.get('country').then((val) => {
       this.country = val;
    });

      this.promotions = [
        {
          promotions: [
            { text: 'm', value: 'm' },
            { text: 'c', value: 'c' },
            { text: 'd', value: 'd' },
            { text: 'e', value: 'e' }
          ]
        },
        {
          promotions: [
            { text: 'm', value: 'm1' },
            { text: 'c', value: 'c1' },
            { text: 'd', value: 'd1' },
            { text: 'e', value: 'e1' }
          ]
        },
        {
          promotions: [
            { text: 'm', value: 'm1' },
            { text: 'c', value: 'c1' },
            { text: 'd', value: 'd1' },
            { text: 'e', value: 'e1' }
          ]
        }
      ];

      this.promotionsValue = new Array(this.promotionsCount-1);


  }
  ionViewDidLoad() {
    console.log(this.country);
  }



  getFormJson(){

    return {
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      birthdate: this.birthdate.value,
      number: this.number.value,
      gender: this.gender.value,
      brand: this.brand.value,
      promotionCount: this.promotion.value,
      promotions: this.promotionsValue,
      country: this.country,
      // promotion1: this.promotion1.value,
      // promotion2: this.promotion2.value,
    }
  }

  save() {

    // Get the current value and add new one
    this.storage.get('forms').then((val) => {
        if (val==null) val = [];

        val.push(this.getFormJson());
        this.storage.set('forms', val);
    });
  }

  load() {
    this.storage.get('forms').then((val) => {
       console.log(val);
     });
  }

  submit(){
    this.save();
    alert("Thank you! your form was submitted.");
  }

  getNumber(num) {
    var list = [];
    for (var i = 1; i <= num; i++) {
      list.push(i);
    }
    return list;
  }

  getPromotion(num) {
    if (this.promotions.length < num) {
      return [];
    } else {
      return this.promotions[num].promotions;
    }
  }

  get promotionsCount() {
    if (this.promotions) {
      return this.promotions.length;
    } else {
      return 0;
    }
  }

  get promotionsSelected() {
    return this.formgroup.controls['promotion'].value;
  }


}
