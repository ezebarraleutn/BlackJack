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

@NgModule({
  declarations: [
    AppComponent,
    SalaComponent,
    BoardComponent,
    CardComponent,
    RegistrarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CartasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
