import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {Utils} from "../../util/Utils";
import {NetworkProvider} from "../../providers/network/network";
import * as _ from 'lodash';
import {HTTP} from "@ionic-native/http";

/**
 * Generated class for the CountyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-county',
  templateUrl: 'county.html',
})
export class CountyPage {

  chartType: string = "line";
  isLoading: boolean = true;
  data: Array<any> = [];
  errorMessage = "No Data Available";

  lineOptions: any;
  barOptions: any;
  county: string = "";
  countyOptions: Array<string> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public networkProvider: NetworkProvider,
              public toastCtlr: ToastController,
              public platform: Platform,
              public http: HTTP) {
  }

  ionViewDidLoad() {
    this.loadData()
  }


  loadData() {

    this.isLoading = true;

    if (this.platform.is("cordova")) {

      let url = `${Utils.baseUrl}finance/all_county_allocation`;

      this.http.get(url, {}, {})
        .then(data => this.postRequestHandler(JSON.parse(data.data)))
        .catch(error => {
          this.isLoading = false;
          Utils.handleNetworkError(this.toastCtlr, error)
        })

    } else {
      this.networkProvider.getAllCountyAllocation().subscribe(
        response => {

          this.postRequestHandler(response)
        },
        error => {

          this.isLoading = false;
          Utils.handleNetworkError(this.toastCtlr, error);
        }
      );
    }
  }

  getCounties() {
    let a = _.map(this.data, "county");
    this.countyOptions = _.uniq(a);
  }

  countySelected() {

    let filteredDateset = _.filter(this.data, ['county', this.county]);

    this.lineOptions = {
      title: {
        text: "County Budget Allocation"
      },
      yAxis: {
        title: {
          text: 'Allocation'
        },
      },
      xAxis: {
        categories: _.map(filteredDateset, "year")
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          threshold: 0
        },

      },
      series: [{
        name: 'Recurrent',
        data: _.map(_.map(filteredDateset, "recurrent"), (o) => parseInt(o))
      }, {
        name: 'Development',
        data: _.map(_.map(filteredDateset, "development"), (o) => parseInt(o))
      }, {
        name: 'Total',
        data: _.map(_.map(filteredDateset, "total"), (o) => parseInt(o))
      }],
    };

    this.barOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: "County Budget Allocation",
      },
      xAxis: {
        categories: _.map(filteredDateset, "year")
      },
      yAxis: {
        title: {
          text: "Allocation"
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Recurrent',
        data: _.map(_.map(filteredDateset, "recurrent"), (o) => parseInt(o))
      }, {
        name: 'Development',
        data: _.map(_.map(filteredDateset, "development"), (o) => parseInt(o))
      }, {
        name: 'Total',
        data: _.map(_.map(filteredDateset, "total"), (o) => parseInt(o))
      }],
      legend: {}
    };
  }

  postRequestHandler(response) {
    this.isLoading = false;
    this.data = response as Array<any>;
    this.getCounties()
  }
}
