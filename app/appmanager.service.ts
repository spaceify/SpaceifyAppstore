//import {APPS, INSTALLEDAPPS} from './mock-apps';
import {Injectable} from '@angular/core';

import {Http, Headers, Response, HTTP_PROVIDERS} from '@angular/http';


import 'rxjs/add/operator/map'
import 'rxjs/Rx';


import {AppItem} from './appitem';


import {Observable} from 'rxjs/Rx';


export enum ServerMessageType {
    Message,
    Warning,
    Notification,
    Error
}

export interface ServerMessage{
	text: string;
	type: ServerMessageType;
}

declare class SpaceifyConfig {
	
	SPACELET : string;
	SANDBOXED : string;
	NATIVE: string;


}

interface SpaceifyHandlers {

	failed();
	error(errors) 
	warning(message, code) 
	notify(message, code) 
	message(message) 
	question(question, choices, origin, answerId)
	questionTimedOut(message, origin, answerId) 


}

declare class SpaceifyApplicationManager{
	public appStoreGetPackages(o: Object, f: Function): void;
	public logOut(origin: SpaceifyHandlers, f: Function): void;
	public stopApplication(unique_name: string, origin: SpaceifyHandlers, callback: Function): void;
	public startApplication(unique_name: string, origin: SpaceifyHandlers, callback: Function): void;
	public restartApplication(unique_name: string, origin: SpaceifyHandlers, callback: Function): void;
	public removeApplication(unique_name: string, origin: SpaceifyHandlers, callback: Function): void;
	public installApplication(unique_name: string, user: string, password: string, force: boolean, origin: SpaceifyHandlers, callback: Function): void;
	public getApplications(types: string[], origin: SpaceifyHandlers, callback: Function): void;
	public logIn(password: string, origin: SpaceifyHandlers, handler: Function); 
	public isAdminLoggedIn(origin: SpaceifyHandlers, handler: Function): void;
	public getSettings(origin: SpaceifyHandlers, handler: Function): void;
	public saveSettings(settings, origin: SpaceifyHandlers, handler: Function): void; 
	public getServiceRuntimeStates(origin: SpaceifyHandlers, handler): void; 


}

declare class SpaceifyCore {
	public isApplicationRunning(unique_name: string, callback: Function) : void;

}

@Injectable()
export class AppManagerService implements SpaceifyHandlers{


	private config: SpaceifyConfig;
	private sam: SpaceifyApplicationManager;
	private core: SpaceifyCore;

	private appStoreApps: AppItem[] = [];
	private installedApps: AppItem[] = [];

	private _serverMessages: ServerMessage[] = [];



	constructor() {

		
		this.config = new SpaceifyConfig();
		this.sam = new SpaceifyApplicationManager();
		this.core = new SpaceifyCore();
		
		//console.log(this.sam);
		
			//this.core.isApplicationRunning(<paketin nimi>, <callback>);

		this.initService();
		//console.log("kerran");
	 }

	private initService(){
		

		
		this.searchAppStore();
		this.updateInstalledApplicationsList();

		//console.log("testesetste");
		var self = this;

		//this.sam.logIn("spaceify123", self, self.printStatus);
		this.sam.isAdminLoggedIn(self, self.printStatus);

		
	}

  	get serverMessages() : ServerMessage[]{
		return this._serverMessages;
  	}

  	clearLogMessages(){

		this._serverMessages = [];

  	}

  	testClick(name){
			var self = this;
			this.sam.isAdminLoggedIn(self, self.printStatus);
			//this.isAppRunning(name);
			//self.sam.restartApplication(name, self, self.printStatus);

			//self.sam.removeApplication(name, self, self.printStatus);

  	}

	searchAppStore(name?: string) {

		this.appStoreApps.length = 0;

		var order = { "name": "ASC" };
		var pageSize = 10;
		var page = 1;
		//var where : {name? : any} = {};
		//var where = { "name": {} };
		var where = { };
		//{ "where": { }, "page": jotain, "pageSize": jotain } 

		//console.log(name);
		if (name)
			where = { "name" : { "value": name, "operator": "LIKE" }};


		console.log(where);
	//where.type = { "value": this.config.SPACELET };

	//where.username = { "value": "*", "operator": "LIKE" };


	var search = {
		"where": {
			"name": { "value": "bigscreen", "operator": "LIKE" },
			"username": { "value": "jouni", "operator": "=" }
		}, "page": 1,
		"pageSize": 20, "order": { "name": "ASC", "username": "ASC" }
	};

	var self = this;

	var searchObject = { "where": where, "page": page, "pageSize": pageSize };

	//console.log(searchObject);
	this.sam.appStoreGetPackages(searchObject,
		(err: any, result: any) => {

			//console.log(err+" "+result);

			if (result == null) {
				console.log("appStoreGetPackages returned null");
				return;
			}

			for (var manifest of result.spacelet) {
				self.appStoreApps.push(new AppItem(manifest));
			}

			for (var manifest of result.sandboxed) {
				self.appStoreApps.push(new AppItem(manifest));
			}

		}
	);
  	}

	updateInstalledApplicationsList() {

		

		this.installedApps.length = 0;
		var self = this;

		var types = [this.config.SPACELET, this.config.SANDBOXED];//, this.config.NATIVE];
		//console.log(this.config.SPACELET);
		
		//this.sam.getApplications(types, self, null);
		
		//this.sam.getApplications(types, self, this.printStatus);

		
		this.sam.getApplications(types, self,
			(apps: any) => {
				console.log(apps);
				if (apps == null) {
					console.log("getApplications returned null");
					return;
				}

				for (var manifest of apps.spacelet) {
					self.installedApps.push(new AppItem(manifest));
				}
				for (var manifest of apps.sandboxed) {
					self.installedApps.push(new AppItem(manifest));
				}


			}
		);

  	}

  	isAppRunning(unique_name : string ) {
		this.core.isApplicationRunning(unique_name, 
			(err, result) => 
				{
				console.log(err);
				console.log(result);
				
				});
  	}

  	/*
  	checkAppStatus(message : string){

  	}
  	*/

	getAppsStoreApps(): Array<AppItem> {
		return this.appStoreApps;
  	}

	getInstalledApps(): Array<AppItem> {
		return this.installedApps;
	}

	commandApp(operation : string, app : AppItem) {
		//this._serverMessages.push(operation);
		var self = this;
		if (operation == "logOut")
			self.sam.logOut(self, self.printStatus);
		else if (operation == "stop")
			self.sam.stopApplication(app.unique_name, self, (message)=>{
				console.log(message);
				self.core.isApplicationRunning(app.unique_name,
					(err, result) => {
						console.log(result);
						app.isRunning = result;

					});

			});
		else if (operation == "start")
			self.sam.startApplication(app.unique_name, self, (message) => {
				console.log(message);
				self.core.isApplicationRunning(app.unique_name,
					(err, result) => {
						console.log(result);
						app.isRunning = result;

					});

			});
		else if (operation == "restart")
			self.sam.restartApplication(app.unique_name, self, (message) => {
				console.log(message);
				self.core.isApplicationRunning(app.unique_name,
					(err, result) => {
						console.log(result);
						app.isRunning = result;

					});

			});
		else if (operation == "remove")
			self.sam.removeApplication(app.unique_name, self, (message) => {
				self.updateInstalledApplicationsList();
				console.log(message);
			});
		else if (operation == "install"){
			//console.log(unique_name);
			self.sam.installApplication(app.unique_name, "", "", true, self, (message) => {
				self.updateInstalledApplicationsList();
				console.log(message);
			});

			//installApplication(applicationPackage, username, password, force, origin, handler) 

		}
	}

	private printStatus(result){
		console.log(result);
	}



	//HANDLERS

	failed() {
		console.log("Application manager: connection failed");
			//$("#adminContainerRight").append($("<div>Setting up the messaging connection failed. There will be no messages or questions from the Application Manager.</div>"));
	}

	error(errors) {
		
		//$("#adminContainerRight").append($("<div><h3>There were " + errors.length + " error(s) during the operation:</h3></div><br>"));
		/*
		for (var i = 0; i < errors.length; i++) {
			for (var j = 0; j < errors[i].messages.length; j++){
				//$("#adminContainerRight").append($("<div style='color: #f00; font-weight: bold;'><i>" + errors[i].codes[j] + "</i> <b>" + errors[i].messages[j] + "</b></div><br>"));
				console.log(errors[i].codes[j]+" "+errors[i].messages[j]);
			}
		}
		*/

		for(let err of errors){
			/*
			for (var i = 0; i < err.messages.length; i++){
				console.log(err.codes[i] + err.messages[i]);
			}
			*/

			var serverMessage = { text: err.code + " " + err.message, type: ServerMessageType.Error };

			console.log(err.code+ " " +err.message);
			//this._serverMessages.push(err.code + ": " + err.message);
			this._serverMessages.push(serverMessage);

		}

	}

	warning(message, code) {

		console.log(code +" "+message);


		//this._serverMessages.push(code + ": " + message);

		var serverMessage = { text: code + " " + message, type: ServerMessageType.Warning };
		this._serverMessages.push(serverMessage);
			
	}

	notify(message, code) {
			//$("#adminContainerRight").append($("<div style='color: #32af32;'><br>" + message + "<br></div>"));
		console.log(code +" "+message);
		//this._serverMessages.push(code + ": " + message);

		var serverMessage = { text: code + " " + message, type: ServerMessageType.Notification };
		this._serverMessages.push(serverMessage);
	}

	message(message) {
		//<!--General messages from the Application manager -- >
		//	$("#adminContainerRight").append($("<div>" + (message != "" ? message : "<br>") + "</div>"));
		console.log(message);

		var serverMessage = { text: message, type: ServerMessageType.Message };
		this._serverMessages.push(serverMessage);
	}

	question(question, choices, origin, answerId) {
		//<!--Questions from the Application manager -- >
		//	$("#adminContainerRight").append($("<div>" + question + "<br>" + "</div>"));
		console.log(question);
		for (var i = 0; i < choices.length; i++){
			//$("#adminContainerRight").append($("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>"));
			console.log("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>");

		}
	}

	questionTimedOut(message, origin, answerId) {
		//<!--Application manager does't wait forever answers to questions -->
		console.log(message);
	}

	

}

@Injectable()
export class MockService {

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

	get serverMessages(): ServerMessage[] {
		return this.mockMessages;
	}

	isAppRunning(unique_name: string) {
		
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
