import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExcisePage } from './excise';
import {ChartModule} from "angular2-highcharts";

@NgModule({
  declarations: [
    ExcisePage,
  ],
  imports: [
    IonicPageModule.forChild(ExcisePage),
    ChartModule.forRoot(require('highcharts'))
  ],
})
export class ExcisePageModule {}
