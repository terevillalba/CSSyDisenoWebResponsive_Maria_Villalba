import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { VerProductoComponent } from '../ver-producto/ver-producto.component';
import { CartComponent } from '../cart/cart.component';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'ver-producto/:nombre', component: VerProductoComponent},
  { path: 'carrito', component: CartComponent}
  ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
