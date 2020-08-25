import { NgModule } from '@angular/core';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { MapModule } from './map/map.module';
import { CarruselImagenesModule } from './carrusel-imagenes/carrusel-imagenes.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { SecureImgModule } from './secure-img/secure-img.module';

@NgModule({
  imports: [
    NavbarModule,
    SidebarModule,
    MapModule,
    CarruselImagenesModule,
    FileUploaderModule,
    SecureImgModule,
  ],
  exports: [
    NavbarModule,
    SidebarModule,
    MapModule,
    CarruselImagenesModule,
    FileUploaderModule,
    SecureImgModule,
  ],
  declarations: [],
})
export class SharedModule {}
