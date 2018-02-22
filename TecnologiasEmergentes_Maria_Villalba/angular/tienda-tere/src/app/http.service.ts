import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Producto } from './producto';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpService {

  response:string="";


  constructor(private http : Http) { }

  getUsuarios(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://tienda-tere.firebaseio.com/usuarios.json', options)
      .map((response: Response)=> response.json())
  }

  getProductos(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://tienda-tere.firebaseio.com/productos.json', options)
      .map((response: Response)=> response.json())
  }

  addToCart(newItem : any): Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(newItem);
    return this.http.post('https://tienda-tere.firebaseio.com/cart.json', body, options ).toPromise()
    //.map((response: Response) => response.json());
     .then(this.extractData)
     .catch(this.handleErrorPromise);
  }

  getCart(): Promise<any[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://tienda-tere.firebaseio.com/cart.json', options).toPromise()
      //.map((response: Response)=> response.json());
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  updateProductsStock(){
    let productos: Producto[];
    let carrito: any[];
    let temp : any[]=[];
    //busco y lleno en carrito los articulos que tengo epara comprar


    this.getProductos()
      .subscribe(
        (data) => {
          let keysP = Object.keys(data);
          keysP.forEach(key => {

            let llave=key
            let productoP=data[key].nombre
            let img=data[key].imagen
            let price=data[key].precio
            let cantOrig=data[key].cantidad

            this.getCart()
            .then(
              (data) => {
                if (data!=null){
                  let keys = Object.keys(data);
                  keys.forEach(key => {
                    let cant=data[key].cantidad
                    let producto=data[key].producto.nombre
                    //console.log("llave: "+llave)
                    //console.log("producto: "+producto)
                    if(productoP==producto){
                      //preparo variables
                      let nuevaCant=Number(cantOrig) - Number(cant)
                      let body =  {
                                  "nombre": producto,
                                  "cantidad": nuevaCant,
                                  "imagen": img,
                                  "precio": price
                              }

                      console.log("Debo actualizar el producto "+productoP+" cantidad actual: "+cantOrig+" nueva cantidad: "+nuevaCant);

                     this.actualizarElemento(llave,body)
                      .subscribe(
                        result => console.log(result),
                        error => console.log(<any>error)
                      );
                      this.eliminarElemento(key)
                      .subscribe(
                        result => console.log(result),
                        error => console.log(<any>error)
                      );
                    }
                  });
                }
            });
          });
      });

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.get('https://tienda-tere.firebaseio.com/productos.json', options)
        .map((response: Response)=> response.json());

  }

  actualizarElemento(llave:any,elemento:any): Observable<any>{
    let url="https://tienda-tere.firebaseio.com/productos/"+String(llave)+".json";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, JSON.stringify(elemento),options)
    .map(res => res.json())
    .catch(this.handleError);
  }

  eliminarElemento(elemento:any): Observable<any>{
    let body = JSON.stringify(elemento);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,
                                        body: body});
    return this.http.delete('https://tienda-tere.firebaseio.com/cart.json', options)
    .map(res => res.json())
    .catch(this.handleError);
  }


extractData(res: Response) {
  let body = res.json();
  return body;
}
handleErrorPromise (error: Response | any) {
  console.error(error.message || error);
  return Promise.reject(error.message || error);
}
handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}
