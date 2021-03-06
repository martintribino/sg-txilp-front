import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getEsPaginatorIntl } from './helpers/es-paginator-intl';
import { FormDireccionComponent } from './dialog/form-direccion/form-direccion.component';
import { FormUsuarioComponent } from './dialog/form-usuario/form-usuario.component';
import { UsuarioDetalleComponent } from './dialog/usuario-detalle/usuario-detalle.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NotAllowedComponent,
    FormDireccionComponent,
    FormUsuarioComponent,
    UsuarioDetalleComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    FormDireccionComponent,
    FormUsuarioComponent,
    UsuarioDetalleComponent,
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
