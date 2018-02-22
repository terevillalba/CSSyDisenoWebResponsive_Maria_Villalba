import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { LoginComponent } from './login/login.component';
import { OperacionesService } from './operaciones.service'
import { HttpService } from './http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    LoginComponent,
    CatalogoComponent,
    VerProductoComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, OperacionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
