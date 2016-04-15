//import {APPS, INSTALLEDAPPS} from './mock-apps';
import {Injectable} from 'angular2/core';


import {AppItem} from './appitem';

import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AppService {


	constructor(private http: Http) { }

/*
  getApps() {
	  return Promise.resolve(APPS);
  }


  getInstalledApps() {
	  return Promise.resolve(INSTALLEDAPPS);
  }
  */


	getManifests(): Observable<AppItem[]> {
	  // return an observable
	  /*
	  return this.http.get('/app/mock-data.json')
		  .map((responseData) => {
			  return responseData.json();
		  })
		  .map((apps: Array<any>) => {
			  let result: Array<AppItem> = [];
			  if (apps) {
				  apps.forEach((app) => {
					  result.push(
						  new AppItem(app.name, app.readme));
				  });
			  }
			  return result;
		  });
		  */

	  return this.http.get('/app/mock-data.json').map((res: Response) => res.json());
  }
 

}