import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Storage } from '@ionic/storage';

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

  formgroup:FormGroup;
  name:AbstractControl;
  key:string = 'name';
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
      promotion1:['',Validators.required],
      promotion2:['',Validators.required]
  	});



  	this.name = this.formgroup.controls['name'];
  	this.surname = this.formgroup.controls['surname'];
  	this.email = this.formgroup.controls['email'];
  	this.birthdate = this.formgroup.controls['birthdate']
  	this.number=this.formgroup.controls['number'];
  	this.gender=this.formgroup.controls['gender'];
  	this.brand=this.formgroup.controls['brand'];
  	this.promotion=this.formgroup.controls['promotion']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerinfoPage');
  }

  saveData(){
    storage.set('test',{ok:'ok'});
  }
  loadData(){
    storage.get('test').then((val) => {
    console.log(val);
  });
  }


}
