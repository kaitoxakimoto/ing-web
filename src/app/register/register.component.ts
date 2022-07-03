import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public api: ApiService, private route:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user: [],
      password:[],
      passwordrev:[]
    });
  }

  async onSubmit() {
    let resource = this.registerForm.value;
    console.log(resource.password )
    console.log(resource.passwordrev)

    if(resource.user && resource.password && resource.passwordrev){
      if (resource.password === resource.passwordrev){
        const respuesta:any =  await this.api.crearUsuario({
          "user": resource.user,
          "password": resource.password
        })
        const status = respuesta.status;
        if (status == "si"){
          this.route.navigate(['/login']);
        }
        const mensaje = respuesta.mensaje;
        alert(mensaje);
      }
      else{
        alert("Las Contraseñas no son Iguales!")
      }
    }

    else{
      alert("Rellene todos los campos");
    }

  }
}
