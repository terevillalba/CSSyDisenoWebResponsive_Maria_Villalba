import { Component, OnInit } from '@angular/core';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import { Producto } from '../producto';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos : Producto[];
  filtro: string;
  miFormulario: FormGroup;

  private productsQuantity:any = '';
  private productJSON:any;
  private subtotal:number;
  private stock:number;

  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.productsQuantity=0;
    this.miFormulario = new FormGroup({
      'filtro': new FormControl('', Validators.required)
    })

    this.
      miFormulario.
      valueChanges.
      subscribe(form => {
        //console.log(form.filtro)
        let temp : Producto[] = [];
        this.httpService.getProductos()
          .subscribe(
            (data) => {
              data.forEach(element => {
                //console.log("entre")
                  if(element.nombre.startsWith(form.filtro)){
                    //console.log("hizo match")
                    temp.push(element);
                  }
              });
              this.productos = temp;
          });

      });


    let temp : Producto[] = [];
    this.httpService.getProductos()
      .subscribe(
        (data) => {
          data.forEach(element => {
              temp.push(element);
          });
          this.productos = temp;
      });

      let cantidadInicial: number=0;
      this.httpService.getCart()
        .then(
          (data) => {
              if (data != null){
              cantidadInicial = Object.keys(data).length;
              console.log("cantidadInicial: "+cantidadInicial);
            }
            document.getElementById("badge").innerHTML  = String(cantidadInicial);

            });




  }

  agregarAlCarrito(prod, cant ) {

    //se calcula el subtotal y se arma el json que se agregara al carrito en la BD
    this.subtotal = Number(prod.precio) * Number(cant);
    this.productJSON = {
      producto : prod,
      cantidad : cant,
      subtotal : this.subtotal
    };
    this.httpService.addToCart(this.productJSON);
    console.log(this.productJSON);

    // Se actualiza la cantidad de productos anhadidos sobre el icon del carrito
    this.productsQuantity = document.getElementById('badge').textContent;
    document.getElementById("badge").innerHTML  = String(Number(this.productsQuantity) + 1);

  }


}
