import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import {AppItem} from './appitem';

import {Observable} from 'rxjs/Rx';

import {SpaceifyHandler, ServerMessage, ServerMessageType} from './spaceifyhandler';

declare class SpaceifyApplicationManager
	{
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

declare class SpaceifyCore
	{
	public isApplicationRunning(unique_name: string, callback: Function) : void;
	}

declare class SpaceifyConfig
	{
	public get(c: string): any;
	}

@Injectable()
export class AppManagerService
{
private core: SpaceifyCore;
private config: SpaceifyConfig;
private sam: SpaceifyApplicationManager;

protected appStoreApps: AppItem[] = [];
protected installedApps: AppItem[] = [];

protected messageHandler : SpaceifyHandler;

//private _serverMessages: ServerMessage[] = [];

constructor()
	{
	var self = this;

	//super();

	if(typeof(SpaceifyConfig) === "function")
		this.config = new SpaceifyConfig();

	if(typeof(SpaceifyApplicationManager) === "function")
		{
		this.sam = new SpaceifyApplicationManager();
			//this.sam.isAdminLoggedIn(self.messageHandler, self.printStatus);
		}

	if(typeof(SpaceifyCore) === "function")
		this.core = new SpaceifyCore();

	this.messageHandler = new SpaceifyHandler();

	//console.log(this.sam);

	//this.core.isApplicationRunning(<paketin nimi>, <callback>);

	//this.initService();
	//console.log("kerran");

	self.updateInstalledApplicationsList(self.searchAppStore);
	}

get serverMessages() : ServerMessage[]
	{
	return this.messageHandler.serverMessages;
	}

getServerMessageStyle(type : ServerMessageType)
	{
	if (type == ServerMessageType.Message)
		return "serverMessageMessage";
	else if (type == ServerMessageType.Error)
		return "serverMessageError";
	else if(type == ServerMessageType.Warning)
		return "serverMessageWarning";
	else if (type == ServerMessageType.Notification)
		return "serverMessageNotification";
	}

clearLogMessages()
	{
	this.messageHandler.clearMessages();
	}

testClick(name)
	{
	var self = this;
	this.sam.isAdminLoggedIn(self.messageHandler, self.printStatus);
	//this.isAppRunning(name);
	//self.sam.restartApplication(name, self, self.printStatus);

	//self.sam.removeApplication(name, self, self.printStatus);
	}

searchInstalledApps(name?: string)
	{
	//this.installedApps;
	//this.apps = this._appservice.getInstalledApps(); => this.installedApps;
	//this._appservice.updateInstalledApplicationsList();
	}

searchAppStore(name?: string)
	{
	var order = { "name": "ASC" };
	var pageSize = 10;
	var page = 1;
	//var where : {name? : any} = {};
	//var where = { "name": {} };
	var where = { };
	//{ "where": { }, "page": jotain, "pageSize": jotain }

	//console.log(name);
	if (name)
		{
		where = { "name" : { "value": name, "operator": "LIKE" }};

		//console.log(name);
		}
	//console.log(where);

	//{ "where": {}, "page": jotain, "pageSize": jotain } hakee kaikki

	//console.log(where);
	//where.type = { "value": this.config.get("SPACELET") };

	//where.username = { "value": "*", "operator": "LIKE" };

	var search = {
		"where": {
			"name": { "value": "bigscreen", "operator": "LIKE" },
			"username": { "value": "jouni", "operator": "=" }
				},
		"page": 1,
		"pageSize": 20, "order": { "name": "ASC", "username": "ASC" }
		};

	var self = this;

	var searchObject = { "where": where, "page": page, "pageSize": pageSize };
	//var searchObject = { "where": {}, "page": 1, "pageSize": 10 };

	//console.log(searchObject);
	this.sam.appStoreGetPackages(searchObject,
	(err: any, result: any) =>
		{
		self.appStoreApps.length = 0;

		if (result == null)
			{
			console.log("appStoreGetPackages returned null");
			return;
			}

		for (var manifest of result.spacelet)
			{
			var appItem:AppItem = new AppItem(manifest);
			appItem.isInstalled = false;
			self.appStoreApps.push(appItem);
		}

		for (var manifest of result.sandboxed)
			{
			var appItem:AppItem = new AppItem(manifest);
			appItem.isInstalled = false;
			self.appStoreApps.push(appItem);
			}

		for (var manifest of result.sandboxed_debian)
			{
			var appItem:AppItem = new AppItem(manifest);
			appItem.isInstalled = false;
			self.appStoreApps.push(appItem);
			}

		for (var manifest of result.native_debian)
			{
			var appItem:AppItem = new AppItem(manifest);
			appItem.isInstalled = false;
			self.appStoreApps.push(appItem);
			}

		for (var appItem of self.appStoreApps)
			{
			if (self.isAppInstalled(appItem))
				{
				appItem.isInstalled = true;
				}
			}
		});
	}

getAppstoreApp(unique_name: string) :AppItem
	{
	for(var appStoreApp of this.appStoreApps)
		{
		if(appStoreApp.unique_name == unique_name)
			return appStoreApp;
		}

	return null;
	}

updateInstalledApplicationsList(callback? : () => void)
	{
	var self = this;

	var types = [this.config.get("SPACELET"), this.config.get("SANDBOXED"), this.config.get("SANDBOXED_DEBIAN"), this.config.get("NATIVE_DEBIAN")];

	this.sam.getApplications(types, self.messageHandler,
	(apps: any) =>
		{
		console.log(apps);

		self.installedApps.length = 0;

		if (apps == null)
			{
			console.log("getApplications returned null");
			return;
			}
		else
			{
			console.log("Updated InstalledApplicationsList");
			}

		for (var manifest of apps.sandboxed)
			{
			var appItem:AppItem = new AppItem(manifest);
			appItem.isInstalled = true;
			self.installedApps.push(appItem);
			}

		for (var manifest of apps.spacelet)
			{
			var appItem:AppItem = new AppItem(manifest);
			appItem.isInstalled = true;
			self.installedApps.push(appItem);
			}

		for (var manifest of apps.sandboxed_debian)
			{
			var appItem:AppItem = new AppItem(manifest);
			appItem.isInstalled = true;
			self.installedApps.push(appItem);
			}

		for (var manifest of apps.native_debian)
			{
			var appItem:AppItem = new AppItem(manifest);
			appItem.isInstalled = true;
			self.installedApps.push(appItem);
			}

		// Update appstore apps list also
		for (var appItem of self.appStoreApps)
			{
			if (self.isAppInstalled(appItem))
				{
				appItem.isInstalled = true;

				this.core.isApplicationRunning(appItem.unique_name,
				(err, result) =>
						{
						appItem.isRunning = result;
						});
				}
			}

		// Check if app is running after installation
		for (var appItem of self.installedApps)
			{
			this.core.isApplicationRunning(appItem.unique_name,
			(err, result) =>
					{
					console.log("updateInstalledApplicationsList - isApplicationRunning", appItem.unique_name, err, result);

					appItem.isRunning = result;
					});
			}

		if(callback)
			callback.bind(self);

		});

	}

getInstalledApp(unique_name: string) :AppItem
	{
	for(var InstalledApp of this.installedApps)
		{
		if(InstalledApp.unique_name == unique_name)
			return InstalledApp;
		}

	return null;
	}

isAppRunning(unique_name : string )
	{
	this.core.isApplicationRunning(unique_name,
	(err, result) =>
		{
		console.log("isAppRunning", unique_name, err, result);
		});
	}

checkAppChanges(app : AppItem)
	{
	var self = this;

	this.core.isApplicationRunning(app.unique_name,
	(err, result) =>
		{
		console.log("checkAppChanges - isApplicationRunning", app.unique_name, err, result);

		app.isRunning = result;
		});

	var where = { "unique_name" : app.unique_name};
	var searchObject = { "where": where, "page": 1, "pageSize": 10 };

	this.sam.appStoreGetPackages(searchObject,
	(err: any, result: any) =>
		{
		if (result == null)
			{
			console.log("appStoreGetPackages returned null");
			return;
			}

		var appStoreManifest;

		for (var manifest of result.spacelet)
			{
			appStoreManifest = manifest;
			}

		for (var manifest of result.sandboxed)
			{
			appStoreManifest = manifest;
			}

		for (var manifest of result.sandboxed_debian)
			{
			appStoreManifest = manifest;
			}

		for (var manifest of result.native_debian)
			{
			appStoreManifest = manifest;
			}

		if(appStoreManifest)
			{
			if (app.version_canonical < appStoreManifest.version_canonical)
				{
				app.updateAvailable = true;
				}
			}
		});
	}

isAppInstalled(app : AppItem) : boolean
	{
	if (app)
		{
		for (var installedApp of this.installedApps)
			{
			if (installedApp.unique_name == app.unique_name)
				{
				return true;
				}
			}
		}

	return false;
	}

/*
checkAppStatus(message : string)
	{
	}
*/

getAppsStoreApps(): Array<AppItem>
	{
	return this.appStoreApps;
	}

getInstalledApps(): Array<AppItem>
	{
	return this.installedApps;
	}

commandApp(operation : string, app : AppItem)
	{
	//this._serverMessages.push(operation);

	console.log("commandApp", operation);

	var self = this;

	if (operation == "logOut")
		self.sam.logOut(self.messageHandler, self.printStatus);
	else if (operation == "stop")
		{
		self.sam.stopApplication(app.unique_name, self.messageHandler,
		(message) =>
			{
			console.log("stopApplication", message);

			self.core.isApplicationRunning(app.unique_name,
			(err, result) =>
				{
				console.log("commandApp", operation, "- isApplicationRunning", app.unique_name, err, result);

				app.isRunning = result;
				});
			});
		}
	else if (operation == "start")
		{
		self.sam.startApplication(app.unique_name, self.messageHandler,
		(message) =>
			{
			console.log("startApplication", message);

			self.core.isApplicationRunning(app.unique_name,
			(err, result) =>
				{
				console.log("commandApp", operation, "- isApplicationRunning", app.unique_name, err, result);

				app.isRunning = result;
				});
			});
		}
	else if (operation == "restart")
		{
		self.sam.restartApplication(app.unique_name, self.messageHandler,
		(message) =>
			{
			console.log("restartApplication", message);

			self.core.isApplicationRunning(app.unique_name,
			(err, result) =>
				{
				console.log("commandApp", operation, "- isApplicationRunning", app.unique_name, err, result);

				app.isRunning = result;
				});
			});
		}
	else if (operation == "remove")
		{
		self.sam.removeApplication(app.unique_name, self.messageHandler,
		(message) =>
			{
			console.log("removeApplication", message);

			self.updateInstalledApplicationsList();
			});
		}
	else if (operation == "install")
		{
		self.sam.installApplication(app.unique_name, "", "", true, self.messageHandler,
		(message) =>
			{
			console.log("commandApp", operation, "- status:", message);

			self.updateInstalledApplicationsList();
			});

		//installApplication(applicationPackage, username, password, force, origin, handler)
		}
	else if(operation == "update")
		{
		self.sam.installApplication(app.unique_name, "", "", true, self.messageHandler,
		(message) =>
			{
			console.log("commandApp", operation, "(update) - status:", message);

			self.updateInstalledApplicationsList();
			});
		}
	}

private printStatus(result)
	{
	console.log(result);
	}

}


