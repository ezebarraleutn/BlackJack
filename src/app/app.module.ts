import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalaComponent } from './sala/sala.component';
import { BoardComponent } from './board/board.component';

import { CartasService } from './cartas.service';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    SalaComponent,
    BoardComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CartasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
