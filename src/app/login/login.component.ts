import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public api: ApiService, private route:Router) {}

  async ngOnInit(): Promise<void> {
    this.loginForm = this.formBuilder.group({
      user: [],
      password: [],
    });

    const token:any = this.api.getToken()
    const tipo:any = await this.api.tipotoken({"token": token});
    if (tipo.tipo != "none"){
      this.route.navigate(['/']);
    } 


  }

  async onSubmit() {
    let resource = this.loginForm.value;
    if (resource.user && resource.password){
      const data: any = await this.api.loginUsuario(resource);
      console.log(JSON.stringify(data));
      if (data.token == '') {
        alert('Contraseña equivocada');
      } else {
        this.api.setToken(data.token);
        location.reload();
        
      }
    }
    else{
      alert("Ingrese todos los campos")
    }

  }
}
