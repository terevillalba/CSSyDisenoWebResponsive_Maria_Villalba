import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import { Producto } from '../producto';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  productos : Producto[];
  nombreProducto : string;

  constructor(private activatedRoute : ActivatedRoute, private httpService : HttpService) {
  this.nombreProducto = this.activatedRoute.snapshot.params['nombre'];
  console.log(this.nombreProducto)
 }

  ngOnInit() {
    let temp : Producto[] = [];
    this.httpService.getProductos()
      .subscribe(
        (data) => {
          //console.log('entre')
          data.forEach(element => {
            //console.log('elemento')
            if (element.nombre == this.nombreProducto) {
                //console.log('lo encontre')
                temp.push(element)

              }
            }
          )
          this.productos = temp;
        }
      );
  }

}
