import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  baseUrl: string = "";//"http://156.0.232.97:8000";

  constructor(public http: HttpClient, public platform: Platform) {
    console.log('Hello NetworkProvider Provider');
    if (this.platform.is("cordova")) this.baseUrl = "http://156.0.232.97:8000";
  }

  getExciseRevenue() {

    let url = `${this.baseUrl}finance/all_excise_revenue`;

    return this.http.get(url);
  }

  getAllCountyAllocation() {

    let url = `${this.baseUrl}finance/all_county_allocation`;

    return this.http.get(url);
  }
}
