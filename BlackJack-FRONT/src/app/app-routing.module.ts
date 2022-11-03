import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegistrarComponent } from './autenticacion/registrar/registrar.component';
import { HomeComponent } from './home/home.component';
import { NormalGuard } from './normal.guard';
import { ReportesComponent } from './reportes/reportes.component';
import { SalaComponent } from './sala/sala.component';

const routes: Routes = [
  { path: '', component: HomeComponent , canActivate: [NormalGuard]},
  { path: 'registrar', component: RegistrarComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sala', component: SalaComponent, canActivate: [NormalGuard]},
  { path: 'reportes', component: ReportesComponent, canActivate: [NormalGuard]},
  { path: '**', component: LoginComponent , canActivate: [NormalGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
