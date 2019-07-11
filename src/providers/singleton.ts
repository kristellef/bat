import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class SingletonService {

    public env:string = 'dev';

    public country:string = 'lebanon';

    // List of objects to be stored on storage
    public stored:Array<string> = [
        'user',
        'token',
        'cigarette_brands',
        'rejection_reasons',
        'promotions',
        'country',
        'forms',
        'rejection_forms',
        'outlet_user',
        'old_outlet_user'
    ]

    // Data object that encapsulates all data
    public data: Object = {};

    constructor(private storage: Storage) {
        if (this.env == 'dev') {
            console.log('Singleton initiated in dev environment.',this.data);
        }

        // Load everydata
        for(let key in this.stored) {
            let item = this.stored[key];

            this.storage.get(item).then(val => {
                this.data[item] = val;
                console.log('Setting '+item,val);
            });
        }
    }

    // Get property of object, and retrieve from storage if exists.
    // If value is set on singleton, do not check in data.
    // Return a promise
    getProperty(propertyName, defaultVal=null) {
        if (this.env == 'dev') {
            console.log('Accessing '+propertyName,this.data);
        }

        // If singleton has property (for country and env mostly)
        if (this[propertyName]) {
            return new Promise( (resolve,reject) => {
                 resolve(this[propertyName] ? this[propertyName] : defaultVal);
            });
        }

        // If value exists on data, do not check for storage.
        if (this.data[propertyName] || this.stored.indexOf(propertyName)==-1) {
            return new Promise( (resolve,reject) => {
                 resolve(this.data[propertyName] ? this.data[propertyName] : defaultVal);
            });
        }
        return this.storage.get(propertyName);
    }

    // Set property of object and store in storage if needed
    setProperty(propertyName,value) {
        if (this.env == 'dev') {
            console.log('Setting '+propertyName,this.data);
        }

        // Put in storage
        if (this.stored.indexOf(propertyName) !== -1) {
            this.storage.set(propertyName, value);
        }

        // If singleton has property (for country and env mostly)
        if (this[propertyName]) {
            this[propertyName] = value;
            return value;
        }

        // Save in Data
        this.data[propertyName] = value;
        return value;
    }

    // TODO: set mutators to save to save to storage
}
