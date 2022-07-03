import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private cookies: CookieService) {}
  //Mensajes

  urlMensajes = 'http://localhost:3000/api/mensajes';
  urlUsuarios = 'http://localhost:3000/api/usuarios';
  urlLogin = 'http://localhost:3000/api/login';
  urlToken = 'http://localhost:3000/api/login/token';

  // obtiene los mensajes
  public getMensajes() {
    let header = new HttpHeaders();
    header.set('Type-content', 'aplication/json');
    return new Promise(resolve => {
      this.http.get<any>(this.urlMensajes).subscribe((data) => {
        resolve(data);
      });
    });
  }

  //publica un mensaje
  public postMensajes(json: any) {
    let header = new HttpHeaders();
    header.set('Type-content', 'aplication/json');
    this.http.post<any>(this.urlMensajes, json).subscribe((data) => {});
  }

  //borra un mensaje
  public borrarMensaje(id:any){
    let header = new HttpHeaders();
    header.set('Type-content', 'aplication/json');
    console.log(this.urlMensajes+"/"+id);
    return new Promise(resolve => {
      this.http.delete<any>(this.urlMensajes+"/"+id).subscribe((data) => {
        location.reload();
        resolve(data);
      });
    });
  }

  //Usuarios
  
  // Devuelve el token de usuario
  public loginUsuario(json: any) {
    let header = new HttpHeaders();
    header.set('Type-content', 'aplication/json')
    return new Promise(resolve => {
      this.http.post<any>(this.urlLogin, json).subscribe((data) => {
        resolve(data);
      });
    });
  }

  // Crea un usuario
  public crearUsuario(json: any) {
    let header = new HttpHeaders();
    header.set('Type-content', 'aplication/json');
    return new Promise(resolve => {
      this.http.post<any>(this.urlUsuarios, json).subscribe((data) => {
        resolve(data);
      });
    });
  }

  // Manejo de tokens

  setToken(token: any) {
    this.cookies.set("token", token);
  }
  
  getToken() {
    return this.cookies.get("token");
  }

  // tipo token

  public tipotoken(json:any){
    return new Promise(resolve => {
      this.http.post<any>(this.urlToken,json).subscribe((data) => {
        resolve(data);
      });
    });
  }
}
