//import {APPS, INSTALLEDAPPS} from './mock-apps';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import {AppItem} from './appitem';

import {Observable} from 'rxjs/Rx';

import {SpaceifyHandler, ServerMessage, ServerMessageType} from './spaceifyhandler';

declare class SpaceifyConfig {
	
	SPACELET : string;
	SANDBOXED : string;
	NATIVE: string;

}

declare class SpaceifyApplicationManager{
	public appStoreGetPackages(o: Object, f: Function): void;
	public logOut(origin: SpaceifyHandler, f: Function): void;
	public stopApplication(unique_name: string, origin: SpaceifyHandler, callback: Function): void;
	public startApplication(unique_name: string, origin: SpaceifyHandler, callback: Function): void;
	public restartApplication(unique_name: string, origin: SpaceifyHandler, callback: Function): void;
	public removeApplication(unique_name: string, origin: SpaceifyHandler, callback: Function): void;
	public installApplication(unique_name: string, user: string, password: string, force: boolean, origin: SpaceifyHandler, callback: Function): void;
	public getApplications(types: string[], origin: SpaceifyHandler, callback: Function): void;
	public logIn(password: string, origin: SpaceifyHandler, handler: Function); 
	public isAdminLoggedIn(origin: SpaceifyHandler, handler: Function): void;
	public getSettings(origin: SpaceifyHandler, handler: Function): void;
	public saveSettings(settings, origin: SpaceifyHandler, handler: Function): void; 
	public getServiceRuntimeStates(origin: SpaceifyHandler, handler): void; 


}

declare class SpaceifyCore {
	public isApplicationRunning(unique_name: string, callback: Function) : void;

}

@Injectable()
export class AppManagerService {


	private config: SpaceifyConfig;
	private sam: SpaceifyApplicationManager;
	private core: SpaceifyCore;

	private appStoreApps: AppItem[] = [];
	private installedApps: AppItem[] = [];

	private messageHandler : SpaceifyHandler;

	//private _serverMessages: ServerMessage[] = [];



	constructor() {

		//super();
		this.config = new SpaceifyConfig();
		this.sam = new SpaceifyApplicationManager();
		this.core = new SpaceifyCore();
		this.messageHandler = new SpaceifyHandler();
		
		//console.log(this.sam);
		
			//this.core.isApplicationRunning(<paketin nimi>, <callback>);

		this.initService();
		//console.log("kerran");
	 }

	private initService(){
		var self = this;

		
		//this.searchAppStore();


		//setTimeout( ()=>self.updateInstalledApplicationsList(), 200);
		//self.updateInstalledApplicationsList();

		//console.log("testesetste");

		//self.updateInstalledApplicationsList();
		

		//this.sam.logIn("spaceify123", self, self.printStatus);
		this.sam.isAdminLoggedIn(self.messageHandler, self.printStatus);

		
	}

  	get serverMessages() : ServerMessage[]{
		return this.messageHandler.serverMessages;
  	}

  	clearLogMessages(){

		this.messageHandler.clearMessages();

  	}

  	testClick(name){
			var self = this;
			this.sam.isAdminLoggedIn(self.messageHandler, self.printStatus);
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
		if (name){
			where = { "name" : { "value": name, "operator": "LIKE" }};

			//console.log(name);

		}
		//console.log(where);

		//{ "where": {}, "page": jotain, "pageSize": jotain } hakee kaikki

		//console.log(where);
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
		//var searchObject = { "where": {}, "page": 1, "pageSize": 10 };

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

		

		var self = this;

		var types = [this.config.SPACELET, this.config.SANDBOXED];//, this.config.NATIVE];
		//console.log(this.config.SPACELET);
		
		//this.sam.getApplications(types, self, null);
		
		//this.sam.getApplications(types, self, this.printStatus);

		

		
		this.sam.getApplications(types, self.messageHandler,
			(apps: any) => {
				console.log(apps);

				this.installedApps.length = 0;

				if (apps == null) {
					console.log("getApplications returned null");
					return;
				}
				else{
					console.log("Updated InstalledApplicationsList");
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

  	checkAppChanges(app : AppItem){
  		

  		var self = this;
  		this.core.isApplicationRunning(app.unique_name,
					(err, result) => {
						console.log(result);
						app.isRunning = result;

					});


  		var where = { "unique_name" : app.unique_name};
  		var searchObject = { "where": where, "page": 1, "pageSize": 10 };
		

		this.sam.appStoreGetPackages(searchObject,
			(err: any, result: any) => {

				//console.log(err+" "+result);

				if (result == null) {
				console.log("appStoreGetPackages returned null");
				return;
				}

				var appStoreManifest;

				for (var manifest of result.spacelet) {
					appStoreManifest = manifest;
				}

				for (var manifest of result.sandboxed) {
					appStoreManifest = manifest;
				}

				//console.log(appStoreManifest);

				if(app.version_canonical < appStoreManifest.version_canonical)
					app.updateAvailable = true;


			}
		);



  	}

  	isAppInstalled(app : AppItem) : boolean{
  		//this.installedApps.

  		if(app){


	  		for(var installedApp of this.installedApps){
	  			if(installedApp.unique_name == app.unique_name )
	  				return true;

	  		}
  		}
  		return false;
  		/*

  		if (this.installedApps.indexOf(app) > -1) {
    		return true;
		}
		return false;

		*/

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
			self.sam.logOut(self.messageHandler, self.printStatus);
		else if (operation == "stop")
			self.sam.stopApplication(app.unique_name, self.messageHandler, (message)=>{
				console.log(message);
				self.core.isApplicationRunning(app.unique_name,
					(err, result) => {
						console.log(result);
						app.isRunning = result;

					});

			});
		else if (operation == "start")
			self.sam.startApplication(app.unique_name, self.messageHandler, (message) => {
				console.log(message);
				self.core.isApplicationRunning(app.unique_name,
					(err, result) => {
						console.log(result);
						app.isRunning = result;

					});

			});
		else if (operation == "restart")
			self.sam.restartApplication(app.unique_name, self.messageHandler, (message) => {
				console.log(message);
				self.core.isApplicationRunning(app.unique_name,
					(err, result) => {
						console.log(result);
						app.isRunning = result;

					});

			});
		else if (operation == "remove")
			self.sam.removeApplication(app.unique_name, self.messageHandler, (message) => {
				self.updateInstalledApplicationsList();
				console.log(message);
			});
		else if (operation == "install"){
			//console.log(unique_name);
			self.sam.installApplication(app.unique_name, "", "", true, self.messageHandler, (message) => {
				self.updateInstalledApplicationsList();
				console.log(message);
			});

			//installApplication(applicationPackage, username, password, force, origin, handler) 

		}
		else if(operation == "update"){

		}
	}

	private printStatus(result){
		console.log(result);
	}

}


