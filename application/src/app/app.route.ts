import {RouterModule, Routes} from "@angular/router";
import {ContentComponent} from "./content/content.component";
import {EditContentComponent} from "./content/edit-content/edit-content.component";
import {FirstPageComponent} from "./firspage/firstpage.component";

//New routes from Angular 2 RC 5
export const APP_ROUTER_PROVIDER: Routes = [
    // For Load content.
    {path: '' , component: FirstPageComponent},
    {path: 'content' , component: ContentComponent},
    {path: 'content/:section' , component: ContentComponent},

    // For edit and create new content.
    {path: 'create-post' ,component: EditContentComponent},
    {path: 'edit/:id' , component: EditContentComponent},
];



export const routers = RouterModule.forRoot(APP_ROUTER_PROVIDER);
