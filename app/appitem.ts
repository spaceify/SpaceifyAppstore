import {DeveloperItem} from './developeritem';
import {ImageItem} from './imageitem';
import {ProvidedServiceItem} from './providedserviceitem';
import {RequiredServiceItem} from './requiredserviceitem';

declare class SpaceifyConfig
	{
	public get(c: string): any;
	public initialize(mode: string): SpaceifyConfig;
	}

declare class SpaceifyUtility
	{
	public getApplicationIcon(manifest: any, startWithSlash: boolean): any;
	}

declare class SpaceifyNetwork
	{
	public getEdgeURL(options: any): any;
	}

export class AppItem
{
private config: SpaceifyConfig;
private utility: SpaceifyUtility;
private network: SpaceifyNetwork;

provides_services: ProvidedServiceItem[];
requires_services: RequiredServiceItem[];
name: string;
unique_name: string;
version: string;
type: string;
category: string;
start_command: string;
developer: DeveloperItem;
short_description: string;
appstore_description: string;
license: string;
creation_date: Date;
implements: string[];
images: ImageItem[];
unique_directory: string;
icon: string;
aicon: any;
version_canonical: string;
publish_date: Date;
readme: string;
versions: string[];
canonical_versions: string;

isInstalled: boolean;
isRunning: boolean;

updateAvailable: boolean;

private dateSplitter = /[ :-]/;

constructor(manifest : any)
	{
	if(typeof(SpaceifyConfig) === "function")
		{
		this.config = new SpaceifyConfig();
		this.config.initialize("");
		}

	if(typeof(SpaceifyUtility) === "function")
		this.utility = new SpaceifyUtility();

	if(typeof(SpaceifyNetwork) === "function")
		this.network = new SpaceifyNetwork();

	this.provides_services = [];
	if (manifest.hasOwnProperty('provides_services'))
		{
		for (var item of manifest.provides_services)
			{
			this.provides_services.push(new ProvidedServiceItem(item));
			}
		}
	this.requires_services = [];
	if (manifest.hasOwnProperty('requires_services'))
		{
		for (var item of manifest.requires_services)
			{
			this.requires_services.push(new RequiredServiceItem(item));
			}
		}

	this.name = manifest.name;
	this.unique_name = manifest.unique_name;
	this.version = manifest.version;
	this.type = manifest.type;
	this.category = manifest.category;
	this.start_command = manifest.start_command;
	this.developer = new DeveloperItem(manifest.developer);
	this.short_description = manifest.short_description;
	if (manifest.hasOwnProperty('appstore_description'))
		{
		this.appstore_description = manifest.appstore_description;
		}
	this.license = manifest.license;
	this.creation_date = this.getManifestDate(manifest.creation_date);
	this.implements = manifest.implements;
	this.images = [];
	if (manifest.hasOwnProperty('images'))
		{
		for (var item of manifest.images)
			{
			this.images.push(new ImageItem(item));
			}
		}
	this.unique_directory = manifest.unique_directory;

	if(typeof manifest.icon == "undefined")											// Installed application
		{
		this.aicon = this.utility.getApplicationIcon(manifest, true);

		if(this.aicon)
			this.icon = this.network.getEdgeURL({ forceSecureProtocol: true, withEndSlash: true }) + this.unique_name + this.aicon;
		else
			this.icon = "assets/images/default_icon-128p.png";
		}
	else																			// Application in repository
		this.icon = window.location.protocol + this.config.get("EDGE_GET_RESOURCE_URL") + encodeURIComponent(manifest.icon);

	this.version_canonical = manifest.version_canonical;
	this.publish_date = this.getManifestDate(manifest.publish_date);
	this.readme = manifest.readme;
	this.versions = manifest.versions;
	this.canonical_versions = manifest.canonical_versions;

	if (manifest.hasOwnProperty('isInstalled'))
		this.isInstalled = manifest.isInstalled;
	else
		this.isInstalled = false;

	if (manifest.hasOwnProperty('isRunning'))
		this.isRunning = manifest.isRunning;
	else
		this.isRunning = false;

	this.updateAvailable = false;
	}

getManifestDate(date : string): any
	{ // 2016-09-26 17:20:00
	var dateParts, mdate = null;

	if (date)
		{
		dateParts = date.split(this.dateSplitter);

		if (dateParts.length == 6)
			mdate = new Date(+dateParts[0], +dateParts[1], +dateParts[2], +dateParts[3], +dateParts[4], +dateParts[5], 0);
		}

	return mdate;
	}

}

//export interface