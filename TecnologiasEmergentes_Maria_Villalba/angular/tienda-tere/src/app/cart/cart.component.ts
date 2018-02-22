import { Component, OnInit } from '@angular/core';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import { Producto } from '../producto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  shoppingCartJSON: any[];
  productos : Producto[];
  private cantidadTotal:number=0;
  private total:number;
  resultado:string="";


  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.cantidadTotal=0;
    this.total=0;
    let temp : any[]=[];
    let temp1 : any[]=[];

    this.httpService.getCart()
      .then(
        (data) => {
          if (data!=null){
            this.cantidadTotal=Object.keys(data).length;
            let keys = Object.keys(data);
            keys.forEach(key => {
              temp.push(data[key])
              this.total=this.total+data[key].subtotal
            });
            this.shoppingCartJSON = temp;
          }
      });
  }

  //Se invoca al servicio para la actualizacion stock de los productos
  updateProductsStock(){
    //alert("Lo que encontre me borro todos los productos del inventario y solo me dejo uno, por lo tanto, no lo implemente");
     this.httpService.updateProductsStock()
    .subscribe(
      (data) => {
      alert("Su pago ha sido procesado exitosamente. Verifique en los logs de consola cuando termine el proceso, que deje de escribir y estara completamente actualizado el inventario.");
      this.cantidadTotal=0;
    });
    }


  }
