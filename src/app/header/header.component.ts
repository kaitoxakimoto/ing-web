import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  tipo: any = '';

  constructor(public api: ApiService) {}

  async ngOnInit(): Promise<void> {
    const token = this.api.getToken()
    this.tipo = await this.api.tipotoken({"token": token})
    console.log(this.tipo);
  }

  async closeSesion(){
    this.api.setToken("");
    location.reload();
  }
}
