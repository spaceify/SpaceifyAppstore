import {Injectable} from '@angular/core';

import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import {AppItem} from './appitem';

import {Observable} from 'rxjs/Rx';

import {SpaceifyHandler, ServerMessage, ServerMessageType} from './spaceifyhandler';

import {AppManagerService} from './appmanager.service'

@Injectable()
export class MockService extends AppManagerService
{
//private appstoreApps: AppItem[] = [];

//private installedApps: AppItem[] = [];

private mockMessages: ServerMessage[] = [];

constructor(private http : Http)
	{
	super();
	this.messageHandler = new SpaceifyHandler();

	this.http.get('appstore/app/mock-data_appstoreapps.json')
		.map(this.extractData)
		.map(this.mapData)
		.catch(this.handleError)
		.subscribe(
			data => {
				this.appStoreApps = data;
					console.log(data);
				},
 			err => {
 					//this.apps_error = true
 					}
				);

		this.http.get('appstore/app/mock-data_installedapps.json')
		.map(this.extractData)
		.map(this.mapData)
		.map(this.setAsInstalled)
		.catch(this.handleError)
		.subscribe(
			data => {
				this.installedApps = data;
					console.log(data);
				},
			err => {
					//this.apps_error = true
					}
				);
	}

searchAppStore(name?: string)
	{
	console.log("Searched: "+name);
	}

/*
getAppstoreApp(unique_name: string) :AppItem
	{
	for(var appStoreApp of this.appstoreApps)
		{
		if(appStoreApp.unique_name == unique_name )
			return appStoreApp;
		}

	return null;
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
*/

updateInstalledApplicationsList()
	{
	var self = this;
	// Update appstore apps list also
	for (var appItem of self.appStoreApps)
		{
		if (self.isAppInstalled(appItem))
			{
			appItem.isInstalled = true;
			}
		}
	}

get serverMessages(): ServerMessage[]
	{
	return this.mockMessages;
	}

isAppRunning(unique_name: string)
	{
	}

/*
isAppInstalled(app : AppItem) : boolean
	{
	if(app)
		{
		for(var installedApp of this.installedApps)
			{
			if(installedApp.unique_name == app.unique_name)
				{
				app.isInstalled = true;
				return true;
				}
			}
		}

	app.isInstalled = false;
	return false;
	}
*/


/*
getAppsStoreApps(): Array<AppItem>
	{
	return this.appstoreApps;
	}

getInstalledApps(): Array<AppItem>
	{
	return this.installedApps;
	}
*/

commandApp(operation : string, app : AppItem)
	{
	//var id = setInterval(frame, 10);

	//clearInterval(id);
	var serverMessage = { text: "Message: "+operation + " " + app.unique_name, type: ServerMessageType.Message };
	this.mockMessages.push(serverMessage);

	var self = this;
	setTimeout(function()
		{
		serverMessage = { text: "Notification: "+operation + " " + app.unique_name, type: ServerMessageType.Notification };
		self.mockMessages.push(serverMessage);

		setTimeout(function()
			{
			serverMessage = { text: "Warning: "+operation + " " + app.unique_name, type: ServerMessageType.Warning };
			self.mockMessages.push(serverMessage);
			}, 300);

		setTimeout(function()
			{
			serverMessage = { text: "Error: "+operation + " " + app.unique_name, type: ServerMessageType.Error };
			self.mockMessages.push(serverMessage);
			}, 300);
		}, 300);

	if (operation == "logOut")
		{}
	else if (operation == "stop")
		{
		app.isRunning = false;
		}
	else if (operation == "start")
		{
		app.isRunning = true;
		}
	else if (operation == "restart")
		{
		app.isRunning = false;
		setTimeout(function()
			{
			app.isRunning = true;
			}, 1000);
		}
	else if (operation == "remove")
		{
		for(var installedApp of this.installedApps)
			{
			if(installedApp.unique_name == app.unique_name)
				{
				var i = this.installedApps.indexOf(installedApp);
				if(i != -1)
					{
					this.installedApps.splice(i, 1);
					}
					break;
				}
			}
		}
	else if (operation == "install")
		{
		var found = false;
		for(var installedApp of this.installedApps)
			{
			if(installedApp.unique_name == app.unique_name)
				{
				found = true;
				}
			}

		if(!found)
			this.installedApps.push(app);
		}
	else if(operation == "update")
		{
		}
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
	this.mockMessages.length = 0;
	}

checkAppChanges(app : AppItem)
	{
	if (Math.random() >= 0.5)
		app.updateAvailable = true;
	else
		app.updateAvailable = false;
	}

private extractData(res: Response)
	{
	if (res.status < 200 || res.status >= 300)
		{
		throw new Error('Bad response status: ' + res.status);
		}

	let body = res.json();
	console.log(body);

	//var app =

	return body || {};
	}

private mapData(apps: Array<any>)
	{
	let result: Array<AppItem> = [];
	console.log(apps);
	if (apps)
		{
		apps.forEach((app) => {
			result.push(
			new AppItem(app));
			});
		}

	return result;
	}

private setAsInstalled(apps: Array<any>)
	{
	if (apps)
		{
		apps.forEach((app) => {
			app.isInstalled = true;
			});
		}

	return apps;
	}

private handleError(error: any)
	{
	// In a real world app we might send the error to remote logging infrastructure
	let errMsg = error.message || 'Server error';
	console.error(errMsg);
	return Observable.throw(errMsg);
	}

}