import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { ReportUbicazioniComponent } from './report-ubicazioni/report-ubicazioni.component';
import { ReportSegnalazioniComponent } from './report-segnalazioni/report-segnalazioni.component';
import { UbicazioniComponent } from './ubicazioni/ubicazioni.component';
import { StoricoOperazioniComponent } from './storico-operazioni/storico-operazioni.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'storico-operazioni', component: StoricoOperazioniComponent, canActivate: [AuthGuard]},
  { path: 'ubicazioni', component: UbicazioniComponent, canActivate: [AuthGuard]},
  { path: 'report-segnalazioni', component: ReportSegnalazioniComponent, canActivate: [AuthGuard]},
  { path: 'report-ubicazioni', component: ReportUbicazioniComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
