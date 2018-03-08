import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkProvider } from '../providers/network/network';
import {ExcisePageModule} from "../pages/excise/excise.module";
import {CountyPageModule} from "../pages/county/county.module";
import {HttpClientModule} from "@angular/common/http";
import {ChartModule} from "angular2-highcharts";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,

    ExcisePageModule,
    CountyPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworkProvider
  ]
})
export class AppModule {}
