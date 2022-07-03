import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { DerechosComponent } from './derechos/derechos.component';
import { ImprimiblesComponent } from './imprimibles/imprimibles.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    ActividadesComponent,
    DerechosComponent,
    ImprimiblesComponent,
    ContactoComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'inicio', component: InicioComponent},
      {path: 'actividades', component: ActividadesComponent},
      {path: 'contacto', component: ContactoComponent},
      {path: 'derechos', component: DerechosComponent},
      {path: 'imprimibles', component: ImprimiblesComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', redirectTo: '/inicio', pathMatch: 'full'},

    ]),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
