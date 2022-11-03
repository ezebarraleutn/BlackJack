import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalaComponent } from './sala/sala.component';
import { BoardComponent } from './board/board.component';

import { CartasService } from './cartas.service';
import { CardComponent } from './card/card.component';

import { HttpClientModule } from "@angular/common/http";
import { RegistrarComponent } from './autenticacion/registrar/registrar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { authInterceptorProviders } from "./autenticacion/auth.interceptor.service";
import { LoginService } from './autenticacion/login.service';
import { RegistrarService } from './autenticacion/registrar.service';
import { PieGPComponent } from './reportes/jugador/pie-gp/pie-gp.component';
import { NgChartsModule } from 'ng2-charts';
import { LineCxpComponent } from './reportes/jugador/line-cxp/line-cxp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndiceVictoriasComponent } from './reportes/juego/indice-victorias/indice-victorias.component';
import { ReportesComponent } from './reportes/reportes.component';
import { JugadasPorDiaComponent } from './reportes/juego/jugadas-por-dia/jugadas-por-dia.component';
import { PromedioJugadasComponent } from './reportes/juego/promedio-jugadas/promedio-jugadas.component';

@NgModule({
  declarations: [
    AppComponent,
    SalaComponent,
    BoardComponent,
    CardComponent,
    RegistrarComponent,
    HomeComponent,
    LoginComponent,
    PieGPComponent,
    LineCxpComponent,
    DashboardComponent,
    IndiceVictoriasComponent,
    ReportesComponent,
    JugadasPorDiaComponent,
    PromedioJugadasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [CartasService, LoginService, RegistrarService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
