import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  respuesta: string;
  mail: string;
  pass: string;

  constructor(private httpService : HttpService, private router : Router) { }

  ngOnInit() {

  }

  enviarForm(form){
    this.mail = form.controls['email'].value;
    this.pass = form.controls['password'].value;
    //console.log('email' + this.mail + ' ' + 'pass' + this.pass);
    this.httpService.getUsuarios()
      .subscribe(
        (data) => {
          //console.log('entre')
          data.forEach(element => {
            //console.log('elemento')
            if (element.email == this.mail && element.psw == this.pass) {
                //console.log('login ok')
                this.respuesta='ok'
                //console.log('Hago el redirect')
                this.router.navigate(['/catalogo'])
              } else {
                alert ('Contraseña incorrecta')
              }
            }
          )
        }
      );
  }

}
