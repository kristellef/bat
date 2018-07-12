import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerinfoPage } from '../pages/customerinfo/customerinfo';
import { AdminPage } from '../pages/admin/admin';
import { FirstpagePage } from '../pages/firstpage/firstpage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerinfoPage,
    AdminPage,
    FirstpagePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: 'ios'}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerinfoPage,
    AdminPage,
    FirstpagePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
