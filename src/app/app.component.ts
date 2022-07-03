import { Component } from '@angular/core';
import { firstValueFrom, isObservable, Observable } from 'rxjs';
import { ApiService } from './servicios/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Entregaa3';
  constructor(){
  }

}
