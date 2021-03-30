import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'storico-operazioni', component: HomeComponent},
  { path: 'ubicazioni', component: HomeComponent},
  { path: 'report-segnalazioni', component: HomeComponent},
  { path: 'report-ubicazioni', component: HomeComponent},
  { path: '**', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
