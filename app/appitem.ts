export class AppItem {
  name: string;
  uniquename: string;
  readme: string;
  icon: string;

  constructor(name: string, uniquename:string, readme: string, icon: string) {
	  this.name = name;
	  this.uniquename = uniquename;
	  this.readme = readme;
	  this.icon = icon
  }
  
}