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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArtistaComponent } from './dialog/form-artista/form-artista.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormUploadImageComponent } from './dialog/form-upload-image/form-upload-image.component';
import { FormActividadComponent } from './dialog/form-actividad/form-actividad.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormEspacioComponent } from './dialog/form-espacio/form-espacio.component';
import { FormObraComponent } from './dialog/form-obra/form-obra.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormEdicionComponent } from './dialog/form-edicion/form-edicion.component';
import { ConfirmarComponent } from './dialog/confirmar/confirmar.component';
import { ChooseAvatarComponent } from './dialog/choose-avatar/choose-avatar.component';
import { AvatarsModule } from 'src/assets/svg/avatars.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NotAllowedComponent,
    FormDireccionComponent,
    FormUsuarioComponent,
    FormArtistaComponent,
    FormUploadImageComponent,
    FormActividadComponent,
    FormEspacioComponent,
    FormObraComponent,
    FormEdicionComponent,
    ConfirmarComponent,
    ChooseAvatarComponent,
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
    MatSnackBarModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AvatarsModule,
  ],
  entryComponents: [
    FormDireccionComponent,
    FormUsuarioComponent,
    FormArtistaComponent,
    FormEspacioComponent,
    FormObraComponent,
    FormActividadComponent,
    FormEdicionComponent,
    ConfirmarComponent,
    ChooseAvatarComponent,
    FormUploadImageComponent,
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
