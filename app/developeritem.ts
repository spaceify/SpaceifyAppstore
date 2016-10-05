export class DeveloperItem {
  name: string;
  url: string;
  email: string;

  constructor(manifest_developer : any) {
	this.name = manifest_developer.name;
	this.url = manifest_developer.url;
	this.email = manifest_developer.email;
  }
}

//export interface