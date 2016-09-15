import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);


//bootstrap(AppComponent, [appRouterProviders, { provide: AppManagerService, useClass: MockService }, HTTP_PROVIDERS]);
//bootstrap(AppComponent, [appRouterProviders, AppManagerService, HTTP_PROVIDERS]);






    


