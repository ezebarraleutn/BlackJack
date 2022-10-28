import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegistrarComponent } from './autenticacion/registrar/registrar.component';
import { HomeComponent } from './home/home.component';
import { SalaComponent } from './sala/sala.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'registrar', component: RegistrarComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sala', component: SalaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
