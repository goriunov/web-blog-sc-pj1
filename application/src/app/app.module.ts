//New module content from angular 2 RC 5
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {routers} from "./app.route";
import {ContentService} from "./content/content.service";
import {AuthService} from "./shared/auth.service";
import {ChatService} from "./chat/chat.service";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContentComponent} from "./content/content.component";
import {EditContentComponent} from "./content/edit-content/edit-content.component";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FirstPageComponent} from "./firspage/firstpage.component";
import {NameService} from "./name.service";
import {DropDownDirective} from "./dropdown.directive";
import {HeaderComponent} from "./header.component";
import {ChatComponent} from "./chat/chat.component";
import {ChatListComponent} from "./chat/chat-list/chat-list.component";
import {ContentListComponent} from "./content/content-list/content-list.component";


@NgModule({
  declarations: [AppComponent , ContentComponent , ContentListComponent  , EditContentComponent , FirstPageComponent, ChatListComponent , HeaderComponent , ChatComponent ,  DropDownDirective],
  imports: [BrowserModule ,HttpModule , routers , FormsModule , ReactiveFormsModule ],
  bootstrap: [AppComponent],
  providers: [ContentService , AuthService , ChatService , {provide: LocationStrategy, useClass: HashLocationStrategy} , NameService ,  DropDownDirective]
})

export class AppModule
{
}
