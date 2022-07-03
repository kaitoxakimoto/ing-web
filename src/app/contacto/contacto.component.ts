import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  contactoForm: FormGroup;
  enviado = false;
  datos: any = [];
  tipo: any ="none"
  

  constructor(private formBuilder: FormBuilder, public api: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.contactoForm = this.formBuilder.group({
      email: [],
      nombre: [],
      mensaje: [],
    });
    const token = this.api.getToken()
    this.tipo = await this.api.tipotoken({"token": token})
    console.log(this.tipo);
    this.mostrarmensajes()
  }

  get form() {
    return this.contactoForm.controls;
  }

  onSubmit() {
    this.enviado = true;
    let resource = this.contactoForm.value;
    this.api.postMensajes(resource);
  }

  onReset() {
    this.enviado = false;
    this.contactoForm.reset();
  }

  async mostrarmensajes() {
    this.datos = await this.api.getMensajes();
  }

  async borrarMensaje(event:any){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    console.log(value);
    await this.api.borrarMensaje(value);
    
  }

}

