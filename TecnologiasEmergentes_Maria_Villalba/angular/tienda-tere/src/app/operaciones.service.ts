import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpService } from './http.service';
import { Response } from '@angular/http';

@Injectable()
export class OperacionesService {

    usuarios : Usuario[];
    login: string;


  constructor(private httpService : HttpService) { }

  initData(){
    this.httpService.getUsuarios()
      .subscribe(
        (data) => {
          this.usuarios = data;
        }

      );
  }

  LoginUsuario(mail: string, pass: string) {
    //console.log('Recibi  mail= ' + mail + ' pass= ' + pass)
    this.httpService.getUsuarios()
      .subscribe(
        (data) => {
          //console.log('entre')
          data.forEach(element => {
            //console.log('elemento')
            if (element.email == mail && element.psw == pass) {
                //console.log('login ok')
                this.login='ok'
              }
            }
          )
        }
      );
    return this.login;

  }

}
