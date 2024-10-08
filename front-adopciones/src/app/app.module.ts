import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { ListarMascotasComponent } from './modules/mascotas/listar-mascotas/listar-mascotas.component';
import { HttpClientModule } from '@angular/common/http';
import { AgregarMascotasComponent } from './modules/mascotas/agregar-mascotas/agregar-mascotas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { ListarTipoMascotasComponent } from './modules/tipo-mascotas/listar-tipo-mascotas/listar-tipo-mascotas.component';
import { AgregarTipoMascotasComponent } from './modules/tipo-mascotas/agregar-tipo-mascotas/agregar-tipo-mascotas.component';
import { ActualizarUsuarioComponent } from './modules/usuarios/actualizar-usuario/actualizar-usuario.component';
import { ListarUsuariosComponent } from './modules/usuarios/listar-usuarios/listar-usuarios.component';
import { ModalUsuariosComponent } from './modules/usuarios/modal-usuarios/modal-usuarios.component';
import { LoginComponent } from './modules/autenticacion/login/login.component';
import { RegistrarComponent } from './modules/autenticacion/registrar/registrar.component';
import { PasswordRecoveryComponent } from './modules/password-recovery/password-recovery/password-recovery.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './modules/home/home/home.component';
import { MascotaCardComponent } from './components/mascota-card/mascota-card.component';
import { FaceRecognitionComponent } from './modules/autenticacion/face-recognition/face-recognition.component';
import { ActualizarUsuarioAutenticationFaceComponent } from './modules/usuarios/actualizar-usuario-autentication-face/actualizar-usuario-autentication-face.component';
import { ResetearPasswordComponent } from './modules/password-recovery/resetear-password/resetear-password.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ImagenUploadComponent } from './modules/imagenes-banner/imagen-upload/imagen-upload.component';
import { ListarImagenBannerComponent } from './modules/imagenes-banner/listar-imagen-banner/listar-imagen-banner.component';
import { ImagenPreviewPipe } from './components/pipes/imagen-preview.pipe';
import { SliderComponent } from './components/slider/slider/slider.component';


import { register } from 'swiper/element/bundle';
import { NavAdminComponent } from './components/navbar/nav-admin/nav-admin.component';
import { NavContainerComponent } from './components/navbar/nav-container/nav-container.component';
// register Swiper custom elements
register();

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListarMascotasComponent,
    AgregarMascotasComponent,
    ListarTipoMascotasComponent,
    AgregarTipoMascotasComponent,
    ActualizarUsuarioComponent,
    ListarUsuariosComponent,
    ModalUsuariosComponent,
    LoginComponent,
    RegistrarComponent,
    PasswordRecoveryComponent,
    ImagenPreviewPipe,
    HomeComponent,
    MascotaCardComponent,
    FaceRecognitionComponent,
    ActualizarUsuarioAutenticationFaceComponent,
    ResetearPasswordComponent,
    ImagenUploadComponent,
    ListarImagenBannerComponent,
    SliderComponent,
    NavAdminComponent,
    NavContainerComponent,



  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-fade' }),

    // TOASTR
    BrowserAnimationsModule,
    ToastrModule.forRoot({ // Configuración del ToastrModule
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: false,
      tapToDismiss: false // El toast desaparecerá después del tiempo, sin importar el mouse
    })

  ],
  exports: [
    // NavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
