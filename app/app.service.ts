//import {APPS, INSTALLEDAPPS} from './mock-apps';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
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

@Injectable()
export class AppService {


	config: SpaceifyConfig;
	sam: SpaceifyApplicationManager;

	appStoreApps: AppItem[] = [];
	installedApps: AppItem[] = [];

	private _serverMessages: ServerMessage[] = [];



	constructor(private http: Http) {

		this.config = new SpaceifyConfig();
		this.sam = new SpaceifyApplicationManager();




		var order = { "name": "ASC" };

		var pageSize = 10;

		var page = 1;

		var where = {};
		
		//where.name = { "value": "pictureviewer", "operator": "LIKE" };
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


		this.sam.appStoreGetPackages({ "where": where, "order": order, "page": page, "pageSize": pageSize }, 
			(err: any, result: any) => {

				if(result == null)
				{
					console.log("appStoreGetPackages returned null");
					return;
				}

				for (var app: any of result.spacelet) {
					self.appStoreApps.push(new AppItem(app.name, app.unique_name, app.readme, app.icon));
				}

				for (var app: any of result.sandboxed) {
					self.appStoreApps.push(new AppItem(app.name, app.unique_name, app.readme, app.icon));
				}

			}
		);

		this.updateInstalledApplicationsList();
		
	 }

  	get serverMessages() : ServerMessage[]{
		return this._serverMessages;
  	}

  	clearLogMessages(){

		this._serverMessages = [];

  	}

  	updateInstalledApplicationsList(){

		this.installedApps = [];
		var self = this;

		var types = [this.config.SPACELET, this.config.SANDBOXED/*, config.NATIVE*/];

		
		this.sam.getApplications(types, self,
			(apps : any) => {
				console.log(apps);
				if (apps == null) {
					console.log("getApplications returned null");
					return;
				}
				
				for (var app: any of apps.spacelet) {
					self.installedApps.push(new AppItem(app.name, app.unique_name, app.readme, app.icon));
				}
				for (var app: any of apps.sandboxed) {
					self.installedApps.push(new AppItem(app.name, app.unique_name, app.readme, app.icon));
				}
				

			}
		);

		
  	}

	getAppsStoreApps(): Array<AppItem> {
			return this.appStoreApps;
  	}

	getInstalledApps(): Array<AppItem> {
		return this.installedApps;
	}

	commandApp(operation, unique_name) {
		//this._serverMessages.push(operation);
		var self = this;
		if (operation == "logOut")
			self.sam.logOut(self, self.printStatus);
		else if (operation == "stop")
			self.sam.stopApplication(unique_name, self, self.printStatus);
		else if (operation == "start")
			self.sam.startApplication(unique_name, self, self.printStatus);
		else if (operation == "restart")
			self.sam.restartApplication(unique_name, self, self.printStatus);
		else if (operation == "remove")
			self.sam.removeApplication(unique_name, self, (result) => {
				console.log(result);
				self.updateInstalledApplicationsList()
			});
		else if (operation == "install")
			self.sam.installApplication(unique_name, "", "", self, (result) => {
				console.log(result);
				self.updateInstalledApplicationsList()
			});
	}

	printStatus(result){
		console.log(result);
	}

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

		for(let err : any of errors){
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

	/*

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

	*/
 

}