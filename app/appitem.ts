export class AppItem {
  name: string;
  unique_name: string;
  readme: string;
  icon: string;
  short_description: string;

  constructor(manifest : any) {
	  this.name = manifest.name;
	  this.unique_name = manifest.unique_name;
	  this.readme = manifest.readme;
	  this.icon = manifest.icon;
	  this.short_description = manifest.short_description;

	  console.log("");
  }
  
}


//export interface