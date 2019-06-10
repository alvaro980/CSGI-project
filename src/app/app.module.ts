import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
//  @ngx-share-button
import {ShareButtonModule} from '@ngx-share/button';
// firebase
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
//  environment config
import {environment} from '../environments/environment';
//  components
import {DynamicPageComponent} from './components/dynamic-page/dynamic-page.component';
//  services
import {DynamicPageService} from './services/dynamic-page.service';
//  fontawesome libraries
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {HttpClientModule} from '@angular/common/http';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';

library.add(fas, faEnvelope, fab);

@NgModule({
  declarations: [
    AppComponent,
    DynamicPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShareButtonModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [DynamicPageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
