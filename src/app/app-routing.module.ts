import { HistoryComponent } from './core/history/history.component';
import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./core/login/login.component";
import { RegistrationComponent } from "./core/registration/registration.component";
import { HomeComponent } from './core/home/home.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuard],
},{
  path: 'login',
  component: LoginComponent,
},{
  path: 'registration',
  component: RegistrationComponent
}, {
  path: 'history',
  component: HistoryComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
