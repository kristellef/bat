import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerinfoPage } from '../pages/customerinfo/customerinfo';
import { AdminPage } from '../pages/admin/admin';
import { FirstpagePage } from '../pages/firstpage/firstpage';
import { EmployeeSelection } from '../pages/employee-selection/employee-selection';
import { RejectionFormPage } from '../pages/rejection-form/rejection-form';
import { SingletonService } from '../providers/singleton';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerinfoPage,
    AdminPage,
    FirstpagePage,
    EmployeeSelection,
    RejectionFormPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { mode: 'ios'}),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerinfoPage,
    AdminPage,
    FirstpagePage,
    EmployeeSelection,
    RejectionFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SingletonService
  ]
})
export class AppModule {}
