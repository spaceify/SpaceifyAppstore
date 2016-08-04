import {Injectable} from '@angular/core';

import {Http, Headers, Response, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';


import {AppItem} from './appitem';


import {Observable} from 'rxjs/Rx';

import {ServerMessage} from './appmanager.service';

@Injectable()
export class MockService{

	private mockApps: AppItem[] = [];

	private mockMessages: ServerMessage[] = [];

	constructor(private http : Http) {

		this.http.get('app/mock-data.json')
			.map(this.extractData)
			.map(this.mapData)
			.catch(this.handleError)
			.subscribe(
				data => {
					this.mockApps = data;
						console.log(data);
					},
 				err => { 
 						//this.apps_error = true 

 						}
			); 
		
	}

	searchAppStore(name?: string) {

	}



	updateInstalledApplicationsList() {}

	get serverMessages(): ServerMessage[] {
		return this.mockMessages;
	}

	isAppRunning(unique_name: string) {
		
	}

	isAppInstalled(app : AppItem){
		return false;
	}

	getAppsStoreApps(): Array<AppItem> {
		return this.mockApps;
	}

	getInstalledApps(): Array<AppItem> {
		return this.mockApps;
	}

	commandApp(operation, unique_name) {

	}

	clearLogMessages() {}

	checkAppChanges(app : AppItem){}

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
					new AppItem(app));
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