import { AuthInterceptor } from './auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { LoginComponent } from './core/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { RegistrationComponent } from './core/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './core/home/home.component';
import { NotificationComponent } from './core/notification/notification.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { UserComponent } from './core/user/user.component';
import { MenuComponent } from './core/menu/menu.component';
import { TransactionComponent } from './core/transaction/transaction.component';
import { from } from 'rxjs';
import { HistoryComponent } from './core/history/history.component';
import { TableComponent } from './core/table/table.component';
import { RepeatTransactionComponent } from './core/repeat-transaction/repeat-transaction.component';
import { AbsPipe } from './pipes/abs.pipe';
import { UserState } from '../app/store';
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    NotificationComponent,
    SidebarComponent,
    UserComponent,
    MenuComponent,
    TransactionComponent,
    HistoryComponent,
    TableComponent,
    RepeatTransactionComponent,
    AbsPipe,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],

})
export class AppModule { }
