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
  promotion1:AbstractControl;
  promotion2:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, private storage: Storage) {
  	this.formgroup = formbuilder.group({
  		name:['',Validators.compose([
		Validators.required,
		Validators.minLength(3)])],
  		surname:['',Validators.required],
  		email:['',Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
  		birthdate:[''],
  		gender:[''],
  		number:['', Validators.compose([Validators.minLength(8),Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]+$')])],
  		brand:['',Validators.required],
  		promotion:['',Validators.required],
      promotion1:['None',Validators.required],
      promotion2:['None',Validators.required]
  	});

  	this.name = this.formgroup.controls['name'];
  	this.surname = this.formgroup.controls['surname'];
  	this.email = this.formgroup.controls['email'];
  	this.birthdate = this.formgroup.controls['birthdate']
  	this.number = this.formgroup.controls['number'];
  	this.gender = this.formgroup.controls['gender'];
  	this.brand = this.formgroup.controls['brand'];
  	this.promotion = this.formgroup.controls['promotion'];
    this.promotion1 = this.formgroup.controls['promotion1'];
    this.promotion2 = this.formgroup.controls['promotion2'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerinfoPage dede');
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
      promotion: this.promotion.value,
      promotion1: this.promotion1.value,
      promotion2: this.promotion2.value,
    }
  }

  save() {
    console.log(this.getFormJson());

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



}
