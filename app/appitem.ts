export class AppItem {
  name: string;
  unique_name: string;
  readme: string;
  icon: string;
  short_description: string;
  isRunning: boolean;

  constructor(manifest : any) {
	  this.name = manifest.name;
	  this.unique_name = manifest.unique_name;
	  this.readme = manifest.readme;
	  this.icon = manifest.icon;
	  this.short_description = manifest.short_description;
    this.isRunning = manifest.isRunning;

	  console.log("");
  }
  
}


//export interface