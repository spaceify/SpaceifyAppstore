
import {DeveloperItem} from './developeritem';
import {ImageItem} from './imageitem';
import {ProvidedServiceItem} from './providedserviceitem';
import {RequiredServiceItem} from './requiredserviceitem'

export class AppItem {
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
  version_canonical: string;
  publish_date: Date;
  readme: string;
  versions: string[];
  canonical_versions: string;

  isInstalled: boolean;
  isRunning: boolean;

  updateAvailable: boolean;

  constructor(manifest : any) {
    this.provides_services = [];
    if (manifest.hasOwnProperty('provides_services')) {
      for (var item of manifest.provides_services) {
        this.provides_services.push(new ProvidedServiceItem(item));
      }
    }
    this.requires_services = [];
    if (manifest.hasOwnProperty('requires_services')) {
      for (var item of manifest.requires_services) {
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
    if (manifest.hasOwnProperty('appstore_description')) {
      this.appstore_description = manifest.appstore_description;
    }
    this.license = manifest.license;
    this.creation_date = new Date(manifest.creation_date);
    this.implements = manifest.implements;
    this.images = [];
    if (manifest.hasOwnProperty('images')) {
      for (var item of manifest.images) {
        this.images.push(new ImageItem(item));
      }
    }
    this.unique_directory = manifest.unique_directory;
    this.icon = manifest.icon;
    this.version_canonical = manifest.version_canonical;
    this.publish_date = new Date(manifest.publish_date);
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
}

//export interface