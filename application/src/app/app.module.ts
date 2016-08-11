
import {NgModule, provide} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {routers} from "./app.route";
import {ContentService} from "./content/content.service";
import {AuthService} from "./shared/auth.service";
import {ChatService} from "./chat/chat.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {ContentComponent} from "./content/content.component";
import {EditContentComponent} from "./content/edit-content/edit-content.component";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";

@NgModule({
  declarations: [AppComponent , ContentComponent , EditContentComponent],
  imports: [BrowserModule ,HttpModule , routers , FormsModule ],
  bootstrap: [AppComponent],
  providers: [ContentService , AuthService , ChatService ,  provide(LocationStrategy, {'useClass': HashLocationStrategy })]
})

export class AppModule
{
}
