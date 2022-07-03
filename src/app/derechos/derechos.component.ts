import { Component, OnInit } from '@angular/core';
import ListaDerechos from '../../assets/derechos.json';
import { ApiService } from '../servicios/api.service';
import $ from 'jquery';
import { JsonpClientBackend } from '@angular/common/http';
var flag = true;

@Component({
  selector: 'app-derechos',
  templateUrl: './derechos.component.html',
  styleUrls: ['./derechos.component.scss'],
})
export class DerechosComponent implements OnInit {
  public movies: Array<any> = [];

  constructor(public api: ApiService) {}

  ngOnInit(): void {}

  fun() {
    if (flag) {
      var derechos = ListaDerechos.derechos;
      var derechoslistt = document.getElementById('listaa')!;
      for (var i = 0; i < derechos.length; i++) {
        var etiqueta = document.createElement('div');
        etiqueta.className = 'col-sm-4 mb-1 mt-1';
        etiqueta.innerHTML =
          `
        <div class="card h-100 ">
        <img class="card-img-top" src="` +
          derechos[i].imagen +
          `" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">` +
          derechos[i].descripcion +
          `</h5>
        </div>
        </div>
      `;
        derechoslistt.appendChild(etiqueta);
        $(etiqueta).fadeIn('slow');
      }
      flag = !flag;
    }
  }
}
