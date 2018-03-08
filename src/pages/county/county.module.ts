import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountyPage } from './county';
import {ChartModule} from "angular2-highcharts";

@NgModule({
  declarations: [
    CountyPage,
  ],
  imports: [
    IonicPageModule.forChild(CountyPage),
    ChartModule.forRoot(require('highcharts'))
  ],
})
export class CountyPageModule {}
