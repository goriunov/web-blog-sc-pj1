import {provideRouter} from "@angular/router";
import {ContentComponent} from "./content/content.component";
import {EditContentComponent} from "./content/edit-content/edit-content.component";

;

export const APP_ROUTER_PROVIDER = [
  provideRouter([
    // For Load content.
    {path: '' , redirectTo: 'content' , pathMatch: 'full'},
    {path: 'content' , component: ContentComponent},
    {path: 'content/:section' , component: ContentComponent},

    // For edit and create new content.
    {path: 'create-post' ,component: EditContentComponent},
    {path: 'edit/:id' , component: EditContentComponent},

  ])

];
