export class RequiredServiceItem
{
service_name: string;
suggested_application: string;
suggested_description: { version: string, short_description: string };

constructor(manifest_requires_service_object : any)
	{
	this.service_name = manifest_requires_service_object.service_name;
	this.suggested_application = manifest_requires_service_object.suggested_application;
	this.suggested_description = manifest_requires_service_object.suggested_description;
	}

}

//export interface