//import {APPS, INSTALLEDAPPS} from './mock-apps';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';


import {AppItem} from './appitem';


import {Observable} from 'rxjs/Rx';

@Injectable()
export class AppService {


	constructor(private http: Http) { }


	getManifests() {
	  // return an observable
	 

		return this.http.get('app/mock-data.json')
			.map(this.extractData)
			.map(this.mapData)
			.catch(this.handleError);
  }

	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		console.log(body);

		//var app =

		return body || {};
	}

	private mapData(apps: Array<any>) {
		let result: Array<AppItem> = [];
		console.log(apps);
		if (apps) {
			apps.forEach((app) => {
				result.push(
					new AppItem(app.name, app.readme, app.icon));
			});
		}
		return result;
	}

	private handleError(error: any) {
		// In a real world app we might send the error to remote logging infrastructure
		let errMsg = error.message || 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
 

}