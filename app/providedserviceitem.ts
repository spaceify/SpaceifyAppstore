export class ProvidedServiceItem
{
service_name: string;
service_type: string;

constructor(manifest_provides_service_object : any)
	{
	this.service_name = manifest_provides_service_object.service_name;
	this.service_type = manifest_provides_service_object.service_type;
	}

}

//export interface