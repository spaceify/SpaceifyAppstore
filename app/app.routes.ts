import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomepageComponent } from './homepage.component';
import { ManageComponent } from './manage.component';
import { ManageAppComponent } from './manageapp.component';
import { InstallComponent } from './install.component';
import { InstallAppComponent } from './installapp.component';
import { IntroComponent } from './intro';
import { PageNotFoundComponent } from './404';

const routes: Routes = [
	{
	path: 'manage/:unique_name',
	component: ManageAppComponent
	},
	{
	path: 'homepage',
	component: HomepageComponent
	},
	{
	path: 'manage',
	component: ManageComponent
	},
	{
	path: 'install/:unique_name',
	component: InstallAppComponent
	},
	{
	path: 'install',
	component: InstallComponent
	},
	{
	path: 'intro',
	component: IntroComponent
	},
	{
	path: '',
	redirectTo: '/intro',
	pathMatch: 'full'
	},
	{ path: '**', component: PageNotFoundComponent },
];

export const routing : ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });