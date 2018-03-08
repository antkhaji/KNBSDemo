import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {NetworkProvider} from "../../providers/network/network";
import {Utils} from "../../util/Utils";
import * as _ from 'lodash';
import {HTTP} from "@ionic-native/http";

/**
 * Generated class for the ExcisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-excise',
  templateUrl: 'excise.html',
})
export class ExcisePage {

  chartType: string = "line";
  isLoading: boolean = false;
  data: Array<any> = [];
  errorMessage = "No Data Available";
  lineOptions: any;
  barOptions: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public networkProvider: NetworkProvider,
              public toastCtlr: ToastController,
              public http: HTTP,
              public platform: Platform) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {

    this.isLoading = true;

    if (this.platform.is("cordova")) {

      let url = `${Utils.baseUrl}finance/all_excise_revenue`;

      this.http.get(url, {}, {})
        .then(data => this.postRequestHandler(JSON.parse(data.data)))
        .catch(error => {
          this.isLoading = false;
          Utils.handleNetworkError(this.toastCtlr, error)
        })

    } else {

      this.networkProvider.getExciseRevenue().subscribe(
        response => {

          this.postRequestHandler(response);
        },
        error => {

          this.isLoading = false;
          Utils.handleNetworkError(this.toastCtlr, error);
        }
      );
    }
  }

  postRequestHandler(response) {

    this.isLoading = false;
    this.data = response as Array<any>;

    this.lineOptions = {
      title: {
        text: "Excise Revenue Commodity",
        subtitle: "Line graph"
      },
      yAxis: {
        title: {
          text: 'Revenue'
        },
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2009
        }
      },
      series: [{
        name: 'Beer',
        data: _.map(this.data, "beer")
      }, {
        name: 'Cigarettes',
        data: _.map(this.data, "cigarettes")
      }, {
        name: 'Waters',
        data: _.map(this.data, "waters")
      }, {
        name: 'Spirits',
        data: _.map(this.data, "spirits")
      }, {
        name: 'Commodities',
        data: _.map(this.data, "commodities")
      }],
    };

    this.barOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: "Excise Revenue Commodity",
        subtitle: "Bar graph"
      },
      xAxis: {
        categories: _.map(this.data, "year")
      },
      yAxis: {
        title: {
          text: "Revenue"
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Beer',
        data: _.map(this.data, "beer")
      }, {
        name: 'Cigarettes',
        data: _.map(this.data, "cigarettes")
      }, {
        name: 'Waters',
        data: _.map(this.data, "waters")
      }, {
        name: 'Spirits',
        data: _.map(this.data, "spirits")
      }, {
        name: 'Commodities',
        data: _.map(this.data, "commodities")
      }],
      legend: {}
    };
  }
}
